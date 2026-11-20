<div align="center">
  <h1>Spencer Prime Buttons</h1>
  <p>A small, fully transparent interactive-buttons helper for <a href="https://www.npmjs.com/package/spencer-prime">spencer-prime</a></p>

  [![npm version](https://img.shields.io/npm/v/spencer-prime-btns.svg)](https://www.npmjs.com/package/spencer-prime-btns)
  [![npm downloads](https://img.shields.io/npm/dm/spencer-prime-btns.svg)](https://www.npmjs.com/package/spencer-prime-btns)
  [![License](https://img.shields.io/npm/l/spencer-prime-btns.svg)](https://github.com/tysavage163/Spencer-Btns/blob/main/LICENSE)
</div>

---

## What this package does — and does not do

**Does:**

- Provides a tiny helper (`sendButtons`, `btn.*`) that builds WhatsApp native-flow interactive button messages for `spencer-prime`.
- Supports URL, reply, copy, call and list buttons out of the box.
- Uses only `spencer-prime`'s public `sendMessage` API under the hood.

**Does NOT:**

- ❌ No `eval`, no `Function()` constructor, no dynamic code loading
- ❌ No string-table obfuscation — the entire `index.js` is plain readable JavaScript
- ❌ No tamper-checks, no environment sniffing
- ❌ No calls to any vendor backend or third-party API
- ❌ No telemetry, no analytics, no usage reporting
- ❌ No hidden `setTimeout` / `setInterval`

Every line is audit-able in under five minutes. If you ever find a line that contradicts this README, open an issue at https://github.com/tysavage163/Spencer-Btns/issues — it will be treated as urgent.

---

## Install

```bash
npm install spencer-prime-btns spencer-prime
