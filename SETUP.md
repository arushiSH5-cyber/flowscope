# Flowscope × n8n: setup, demo and pitch

**One line:** Flowscope shows every app your automations and code touch as a 3D solar system, fixes the holes for you, and keeps watch with n8n automations. n8n is both the engine and a target. Pitch, competitors and money: see `PITCH.md`.

Files (all in `~/Downloads/flowscope`):
- `flowscope.html`: the app (one file, open it in Chrome). `index.html` forwards to it for GitHub Pages.
- `workflows/flowscope-scan-repo.json`: n8n workflow the app calls to scan any GitHub repo (with an AI Agent)
- `workflows/flowscope-mcp-server.json`: **n8n MCP server**. Claude, Cursor or any MCP client can scan repos, audit workflows and check code for keys
- `workflows/flowscope-push-guard.json`: n8n workflow that checks every GitHub push and emails you about leaked keys
- `workflows/flowscope-weekly-audit.json`: n8n workflow that audits all your n8n workflows every Monday
- `workflows/flowscope-error-alert.json`: emails you when any workflow fails (set it as the Error Workflow everywhere)
- **Easiest way to get any of them:** in the app, **Automations** → type your email → **Copy for n8n** → click an empty n8n canvas → Ctrl+V. Your email is already filled in.
- After editing a workflow file, run `node scripts/embed-workflows.mjs` so the app gets the new copy (CI checks this).
- `scripts/flowscope-lint.mjs`: **Flowscope lint**, the same checks as a command and in GitHub Actions (`.github/workflows/flowscope-lint.yml`) and a pre-commit hook (`.githooks/pre-commit`)

**GitHub rule:** nothing gets committed or pushed with a time before 12:30 PM on Nov 15.

---

## Time plan (judging at 4:00)

| Time | Do |
|---|---|
| 1:00 to 1:40 | Steps 1–3: n8n account, import all 4 workflows, scan workflow working end to end |
| 1:40 to 2:05 | Step 7: MCP server, connected to Claude Desktop or Cursor (**main feature**) |
| 2:05 to 2:25 | Step 8: push to GitHub, so the lint Action runs; step 4 push guard, then push a fake key and get the email |
| 2:25 to 2:40 | Weekly audit: run it once by hand |
| 2:40 to 3:00 | Host the app (step 6), practice the demo twice, take screenshots |
| 3:00 to 3:30 | Slides (5 max), backup screen recording of the demo |
| 3:30 to 4:00 | Buffer. Nothing new after 3:30. |

---

## 1. n8n account (2 min)
Sign up at app.n8n.cloud/register and use the buildathon code from the slide.

## 2. Import the workflows (5 min)
For each JSON file in `workflows/`: in n8n, **Create workflow** → open the file, select all, copy → click the empty canvas and paste. (Or use the **...** menu > Import from file.) Save.

## 3. Scan-repo workflow (15 min)
1. Open **OpenAI Chat Model** and pick or create your OpenAI credential. Any chat model works: swap in Gemini, Claude or OpenRouter if you'd rather.
2. Click **Execute workflow**, then in a terminal run:
   ```
   curl -X POST -d "repo=arushiSH5-cyber/gitgud" <TEST URL from the "Flowscope asks" node>
   ```
   Every node should go green, and you get JSON back with `files` and `summary`.
3. Toggle the workflow **Active** and copy the **Production URL**.
4. Open `flowscope.html` → **n8n** → **Scan a GitHub repo with n8n** → paste the URL and a repo → **Scan with n8n**. The map appears, then the AI Agent's summary.

If something fails:
- *rate limit* from GitHub: n8n Cloud shares IP addresses. Add a **Header Auth** credential (`Authorization: Bearer <github token>`) to **Get repo** and **Get file list**, using a credential rather than typing the token into the node. Flowscope flags tokens typed into nodes.
- *Could not reach n8n* in the app: check the workflow is **Active**, you used the Production URL, and **Flowscope asks** > Options > **Allowed Origins (CORS)** is `*`. The app sends a plain form post, so browsers don't need a CORS preflight.
- Big repos: the workflow reads the 80 most useful files and never downloads `.env`.

## 4. Push guard (15 min)
1. Connect Gmail in **Email me** and set your address (or swap in Slack or Discord).
2. Activate it and copy the Production URL of **GitHub push**.
3. On a test repo: Settings → Webhooks → Add webhook → Payload URL = that URL, content type `application/json`, **Just the push event**.
4. Push a commit with a fake key to test it, e.g. `const k = "sk_live_" + "abcdefghijklmnopqrstuvwx"` written as one string. You get an email naming the file, the line, and the 3 things to do.

## 5. Weekly audit (10 min)
1. n8n Settings → **n8n API** → create an API key. Add it as an **n8n API** credential in **Get all workflows**.
2. Connect Gmail in **Email me**.
3. **Execute workflow** once. It audits every workflow you have, including these three.

## 6. Host the app (5 min)
Pick one:
- Just open `flowscope.html` in Chrome from your laptop. Everything works, including the n8n scan.
- Drag the file onto app.netlify.com/drop for a public link judges can open.
- Commit it as `index.html` to a new GitHub repo and turn on GitHub Pages.

---

## 7. MCP server: Flowscope inside Claude or Cursor (15 min)
n8n's **MCP Server Trigger** turns this workflow into an MCP server. Its three tools:
- `scan_github_repo`: runs the scan workflow and returns the AI summary plus the file list (`lite=1`, so it never floods the chat with file contents)
- `audit_n8n_workflow`: paste any workflow JSON, get a health score and numbered fixes
- `check_code_for_keys`: paste code or a `git diff`, get leaked keys by line number (never the values)

1. Import `flowscope-mcp-server.json`.
2. **Flowscope MCP** → Credential → new **Bearer Auth** credential. For the token, run `openssl rand -hex 24` and paste the output. Keep it out of the repo. (An MCP server with no lock lets anyone call your tools, and Flowscope now flags it, so we lock ours.)
3. **scan_github_repo** → URL: put the scan workflow's **Production URL** there in place of `https://YOUR-NAME.app.n8n.cloud/webhook/flowscope-scan`.
4. Activate it and copy the **Production URL** from **Flowscope MCP**.
5. Connect a client (pick one):
   - **Claude Code**:
     ```
     claude mcp add --transport http flowscope <MCP URL> --header "Authorization: Bearer <token>"
     ```
   - **Cursor**: `~/.cursor/mcp.json` → `{"mcpServers":{"flowscope":{"url":"<MCP URL>","headers":{"Authorization":"Bearer <token>"}}}}`
   - **Claude Desktop**: Settings → Developer → Edit Config → `{"mcpServers":{"flowscope":{"command":"npx","args":["-y","mcp-remote","<MCP URL>","--header","Authorization: Bearer <token>"]}}}`, then restart it.
6. Test it: *"Use flowscope to scan arushiSH5-cyber/gitgud"* and *"Audit this n8n workflow: <paste>"*.

If the client can't connect: check the workflow is Active, you're using the Production URL (not Test), and the token matches. If **Flowscope MCP** shows a `?` icon after import, delete it and add a fresh **MCP Server Trigger**, then drag the three tools onto its Tools input.

**Bonus, MCP the other way:** in any AI Agent, add an **MCP Client Tool** pointing at another MCP server (GitHub's, for example) to give the agent more tools. Same rule: a credential, never a token typed into the node.

## 8. Lint and automation on GitHub (5 min)
```
cd ~/Downloads/flowscope
npm run lint          # run it once by hand
npm run hooks         # pre-commit hook: a commit with a leaked key gets stopped
```
- **On every push**, the GitHub Action runs the same lint, and problems appear as red or yellow notes on the exact line in the commit view.
- `npm run lint:strict` makes warnings fail too.
- To allow a *labeled fake* sample value, add `flowscope-ignore` on that line. The app's sample does this; nothing real should.
- Right now it reports **0 errors and 4 warnings on our own repo**: two webhooks with no lock and two `you@example.com` placeholders. That's real and fine for the demo ("we lint ourselves"). Put your email in, and those two warnings go away.

What runs automatically once set up:
| When | What | Where |
|---|---|---|
| Every `git commit` | Flowscope lint | your laptop (pre-commit hook) |
| Every push or PR | Flowscope lint, notes on lines | GitHub Actions |
| Every push | added lines scanned, email if a key leaked | n8n push guard |
| Every Monday 9am | every n8n workflow audited, email | n8n weekly audit |
| Whenever you ask | scan, audit, key check | n8n MCP server, from Claude or Cursor |

---

## The demo (3 minutes)

**0:00 Hook.** "The deck this morning said one person can now ship what used to take a team. They also connect what used to take a team: our sample automation touches 6 apps. Can you name them all, and which ones hold a key? Nobody can. So we built a map."

**0:20 The map.** Flowscope opens on a sample lead-gen workflow. "Every planet is an app this workflow touches. The bigger and closer it orbits, the more the workflow uses it. Beams show which way data flows." Press **Tour** (15 seconds, auto-plays).

**0:45 The problems (and the sun).** The sun flares red because a key leaked. Health score 27, five hazards:
- the comet: an Apify token typed straight into the URL of an HTTP node, so anyone you share the workflow with has it
- an unsubscribe webhook anyone can call
- an AI agent that can send email with no human approving it
- a turned-off Gemini node still wired in
- no error workflow

Tap the comet: the exact field, the n8n steps to fix it, and a reminder to rotate the key.

**1:10 Fix it for me (the wow moment).** Open **Automations**: "Other scanners stop at a report. We hand you the fixed workflow." Show the list of fixes, press **See it on the map**, and health goes **27 → 74**. "And it tells you the 2 things that still need a human." Press **Copy fixed workflow** and paste it into n8n, so they see the sticky note listing every change.

**1:40 Your workflow, live.** "Give me any workflow." Ctrl+A, Ctrl+C in n8n, paste, map. Best moment: use a judge's or the morning demo workflow if someone offers one. Otherwise paste our own scan workflow and show it flagging *our own* open webhook: "we ran it on ourselves."

**1:55 The satellites.** "These 5 satellites orbiting the sun are real n8n workflows running in our n8n. Green means it is watching right now." Click one, and the Automations panel opens.

**2:00 n8n as the engine.** Back in **Automations**: "Everything you just saw is n8n. Six workflows, one click each to copy." Switch to the n8n editor. "This workflow takes a GitHub repo, pulls the files, and an AI Agent explains the stack in plain words." Run the scan from the app, and the 3D map plus the agent's summary appear.

**2:15 MCP: it's in your AI tool too.** In Claude or Cursor: "Audit this n8n workflow" (paste one), then the health score and fixes come back from our n8n MCP server. "Your AI assistant can check its own work before it ships."

**2:30 It keeps watching.** Show the push guard email on your phone: "Every push is checked. Leak a key at 2am and you get this email before anyone finds it." Then the Monday audit email for all your workflows.

Then the GitHub commit page: the lint Action's notes on the exact lines.

**2:50 Close.** "Flowscope: see everything your automations touch, fix what's exposed. Built on n8n, it checks n8n, and it's an MCP server, so your AI can use it."

---

## Why it scores well

- **Idea / uniqueness:** n8n scanners exist (n8n audit, FlowGuard, FlowSentry, RiskVoid, audit8n), but they all stop at a report. Flowscope **returns the fixed workflow**, explains it to beginners as a map, covers the code too, and runs inside n8n and your AI tool (MCP).
- **Implementation / does it work:** a real n8n MCP server (MCP Server Trigger + HTTP Request Tool + Code Tools), real parsing of any pasted workflow JSON, real repo scans through n8n (HTTP Request, Code, AI Agent, Respond to Webhook), a real push webhook with an email alert, and a real audit through the n8n API. No fake data outside the clearly labeled sample.
- **Presentation / clarity:** one health score, one picture, one space hazard per problem, and steps written for n8n users.

## Likely questions
- *Does it see my keys?* Keys stored in n8n credentials are never in the workflow JSON, so Flowscope can't see them, which is the point. It only catches keys typed into node fields.
- *Where does my code go?* Pasting a workflow stays in the browser. The repo scan runs in your own n8n, and only the AI summary step sends text to your chosen model. Swap in a local model if you want nothing to leave.
- *Is the MCP server safe?* It has a Bearer token lock, the tools only read, and the key checker never prints key values. Your MCP client asks you before each tool call.
- *What's next?* A Flowscope n8n community node, Slack alerts, and auto-fix that moves typed keys into credentials through the n8n API.
