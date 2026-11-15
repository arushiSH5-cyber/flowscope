# Flowscope

See every app your n8n automations and code touch as a 3D solar system, then **fix the holes in one click** and keep watch with n8n.

**Try it:** open `flowscope.html` in Chrome. It starts on a sample n8n workflow. Press **Automations** → **Fix it for me**, then **See it on the map** (health 27 → 74).

**Install it as an app:** open the link on your phone or laptop. In Chrome or Edge, click **Install** (top right of the app, or the install icon in the address bar). On iPhone, tap Share, then **Add to Home Screen**. It opens full screen and works offline.

## What's inside
- `flowscope.html`: the app. One file, no build, and nothing you paste leaves the browser.
- `workflows/`: six n8n automations (repo scanner with an AI Agent, **MCP server**, push guard, weekly audit, error alerts, plus the auto-fix in the app). Copy any of them from the app's **Automations** panel with your email filled in.
- `scripts/flowscope-lint.mjs`: the same checks as a CLI, a pre-commit hook (`npm run hooks`) and a GitHub Action.

## Setup and pitch
- `SETUP.md`: step-by-step n8n setup, MCP client config, and the 3-minute demo script.
- `PITCH.md`: how it stands out from other n8n scanners, and how it makes money.
