// spencer-btns -- transparent, unobfuscated interactive-buttons helper for spencer-baileys
import { generateWAMessageFromContent, prepareWAMessageMedia } from 'spencer-baileys'

export const btn = {
	url(display_text, url, merchant_url) {
		return {
			name: 'cta_url',
			buttonParamsJson: JSON.stringify({
				display_text,
				url,
				merchant_url: merchant_url || url
			})
		}
	},
	copy(display_text, copy_code) {
		return {
			name: 'cta_copy',
			buttonParamsJson: JSON.stringify({
				display_text,
				copy_code
			})
		}
	},
	call(display_text, phone_number) {
		return {
			name: 'cta_call',
			buttonParamsJson: JSON.stringify({ display_text, phone_number })
		}
	},
	reply(display_text, id) {
		return {
			name: 'quick_reply',
			buttonParamsJson: JSON.stringify({ display_text, id })
		}
	},
	list(list_button_text, sections) {
		return {
			name: 'single_select',
			buttonParamsJson: JSON.stringify({ title: list_button_text, sections })
		}
	}
}

export async function sendButtons(sock, jid, options = {}) {
	const {
		text = '',
		footer = '',
		title,
		subtitle,
		buttons,
		interactiveButtons,
		contextInfo,
		quoted,
		image // 👈 1. Added image to destructuring
	} = options

	const resolvedButtons = buttons || interactiveButtons || []

	if (!Array.isArray(resolvedButtons) || resolvedButtons.length === 0) {
		throw new Error('spencer-btns: sendButtons requires at least one button')
	}

	for (const b of resolvedButtons) {
		if (!b || typeof b.name !== 'string' || typeof b.buttonParamsJson !== 'string') {
			throw new Error('spencer-btns: each button needs { name, buttonParamsJson }')
		}
	}

	// 👈 2. Prepare the header with optional image
	let header = { title: title || '', subtitle: subtitle || '', hasMediaAttachment: false }
	
	if (image) {
		// Prepare the media for WhatsApp
		const media = await prepareWAMessageMedia(
			{ image: typeof image === 'string' ? { url: image } : image },
			{ upload: sock.waUploadToServer }
		)
		header = {
			title: title || '',
			subtitle: subtitle || '',
			hasMediaAttachment: true,
			imageMessage: media.imageMessage
		}
	}

	const bodyAndHeader = {
		header, // 👈 3. Use the new header object
		...(text ? { body: { text } } : {}),
		...(footer ? { footer: { text: footer } } : {})
	}

	if (contextInfo && typeof contextInfo === 'object') {
		bodyAndHeader.contextInfo = contextInfo
	}

	const interactiveMessage = {
		...bodyAndHeader,
		nativeFlowMessage: {
			buttons: resolvedButtons,
			messageParamsJson: ''
		}
	}

	const messageContent = { interactiveMessage }

	const interactiveStanzaNodes = [
		{
			tag: 'biz',
			attrs: {},
			content: [
				{
					tag: 'interactive',
					attrs: { type: 'native_flow', v: '1' },
					content: [
						{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }
					]
				}
			]
		}
	]

	const fullMessage = generateWAMessageFromContent(jid, messageContent, {
		quoted,
		userJid: sock.user?.id
	})

	await sock.relayMessage(jid, fullMessage.message, {
		messageId: fullMessage.key.id,
		additionalNodes: interactiveStanzaNodes
	})

	return fullMessage
}

export const sendInteractiveMessage = sendButtons
export default { sendButtons, sendInteractiveMessage, btn }
