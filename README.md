# 🪐 Flowscope

### ▶️ Live app: **https://arushish5-cyber.github.io/flowscope/**

[![Open the live app](https://img.shields.io/badge/Open%20the%20live%20app-ff8a5c?style=for-the-badge)](https://arushish5-cyber.github.io/flowscope/)
[![Built on n8n](https://img.shields.io/badge/Built%20on-n8n-ea4b71?style=for-the-badge)](https://n8n.io)
[![Installable app](https://img.shields.io/badge/Installable-PWA-3ee0d0?style=for-the-badge)](https://arushish5-cyber.github.io/flowscope/)

See every app your n8n automations and code touch as a **3D solar system**, **fix the holes in one click**, and let **n8n agents** keep watch.

- 🌞 **Your project is the sun.** Every app it uses is a planet, and the bigger and closer a planet orbits, the more the project uses it.
- ☄️ **Problems are space hazards:** a comet for a leaked key, a UFO for an open door, a black hole for a silent failure.
- 🪄 **The Fixer** hands back a repaired n8n workflow. The sample goes from health **27 → 74**.
- 🤖 **Five n8n agents** keep watch: 🛡️ Guard checks every git push for leaked keys, 🚨 Siren sends error alerts, 🕵️ Inspector runs a weekly audit, 🤖 Buddy is an MCP server for Claude and Cursor, and 🔭 Scout scans repos with an AI Agent.

## Try it in 30 seconds
1. Open the **[live app](https://arushish5-cyber.github.io/flowscope/)**. It starts on **🏠 Home**, which explains every tab.
2. Press **🪐 See the sample** to see a lead-gen workflow as a solar system.
3. Open **🛠️ Fix**, then **See it on the map**, and watch health go 27 → 74.
4. On Home, under **Try a real project**, press **🧗 GitUp**. Our n8n reads the real repo and builds its solar system live.

## 📲 Install it as an app
- **Laptop (Chrome or Edge):** click **📲 Install** at the top right of the app.
- **iPhone:** in Safari, tap **Share**, then **Add to Home Screen**.
- **Android:** in Chrome, tap **Install app**.

It opens full screen, has its own icon, and works offline.

## What's inside
| Path | What it is |
|---|---|
| `flowscope.html` | The app. One file, no build step, and nothing you paste leaves the browser. |
| `manifest.webmanifest`, `sw.js`, `icons/` | What makes it an installable, offline-capable app |
| `workflows/` | The 5 n8n workflows behind the agents. Copy any of them from the app's **🤖 Agents** tab, with your email filled in. |
| `scripts/flowscope-lint.mjs` | The same checks as a CLI, a pre-commit hook (`npm run hooks`) and a GitHub Action |

## Setup and pitch
- [`SETUP.md`](SETUP.md): step-by-step n8n setup, MCP client config, and the 3-minute demo script
- [`PITCH.md`](PITCH.md): how it stands out from other n8n scanners, and how it makes money
