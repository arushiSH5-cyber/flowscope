# Flowscope: pitch, standout and money

## One line
Flowscope shows everything your n8n automations and code touch as a sunny 3D island map, **fixes the holes for you**, and keeps watch with n8n automations so new holes get caught the day they appear.

## The problem
n8n makes it easy for one person to connect a dozen apps. The fastest way to get a node working is to paste the API key straight into it, leave the webhook on "None", and let the AI agent send email by itself. Those workflows then get shared as templates, exported, and screenshotted. Nobody sees the whole picture, and nobody is told when something breaks.

## Who else is out there (be ready for this question)
Workflow scanners already exist: n8n's own `n8n audit`, FlowGuard, FlowSentry, RiskVoid, audit8n, and an Apify auditor. **Every one of them stops at a report.** You get a list of rules you broke.

## How Flowscope stands out
| | Scanners | Flowscope |
|---|---|---|
| Finds the holes | yes | yes |
| **Fixes them for you** | no | **Fix it for me** returns a repaired workflow to paste back in. The sample goes from health 27 to 74 in one click, and it tells you honestly which 2 steps still need a person |
| Who it's for | security people reading rule IDs | beginners: a picture, plain words, step-by-step n8n fixes |
| What it covers | one workflow file | workflows **and** the code they sit next to (repo scan, push guard, lint) |
| Where it lives | a CLI or a web page you have to remember | **inside n8n and your AI tool**: an MCP server for Claude/Cursor, a push guard, Monday audits, error alerts |
| Built on | standalone | **n8n itself**: 6 real workflows, and it checks n8n with n8n |

The judging line: *"Other tools tell you what's wrong. Flowscope hands you the fixed workflow, then keeps watch so it stays fixed."*

## Automation is the product
Flowscope is a set of n8n workflows, and the app is the window onto them. All of them can be copied from **Automations** in the app, with your email already filled in:

1. **Fix it for me**: rewrites the mapped workflow. It takes typed keys out and switches the node to a credential, locks open webhooks and MCP servers, makes public chats private, and deletes turned-off nodes. A sticky note in the fixed workflow lists what changed and what's left.
2. **Push guard**: every git push, checks added lines for leaked keys and emails you.
3. **Error alerts**: any failing workflow emails you what broke and a link to the run.
4. **Weekly audit**: every Monday, audits every workflow in your n8n through the n8n API.
5. **MCP server**: Claude, Cursor or any MCP client can scan a repo, audit a workflow, or check a diff for keys.
6. **Repo scanner**: n8n plus an AI Agent explains any GitHub repo's stack.

Plus **Flowscope lint**, the same rules as a CLI, a pre-commit hook and a GitHub Action.

## How it makes money
Open core: the parts that bring people in stay free, and the parts that save time or get resold are paid.

| Plan | Who | What | Price idea |
|---|---|---|---|
| **Free** | solo builders | map and fix in the browser, all 6 workflow templates, CLI lint, GitHub Action | $0 |
| **Pro** | people with a live n8n | hosted watch: push guard, weekly audit and error alerts run for you with no setup, health history, Slack alerts, unlimited auto-fix | ~$12 / month |
| **Agency** | n8n freelancers and agencies building for clients | many n8n instances, a branded "security check" report to hand each client, MCP for the whole team | ~$79 / month |
| **Verified templates** | people selling n8n templates | "Flowscope checked: no keys, locked webhooks" badge for template listings | per template or creator plan |

Why agencies first: they ship workflows to clients who can't read JSON, a leaked key is their liability, and a branded report is something they can bill for. One agency covers many workflows, so we get paid on value, not on seats.

Later: an n8n community node, auto-fix applied directly through the n8n API (no copy-paste), and a partnership pitch to n8n's template gallery.

## Likely questions
- **"Isn't this just n8n audit?"** n8n's audit is instance-wide and for owners: credentials, risky nodes, unprotected webhooks. We go per workflow, for beginners, show it visually, *fix* it, and cover their code too. The weekly audit can call n8n's own audit next to ours.
- **"Does auto-fix break my workflow?"** You get a copy, and your original stays untouched. Every change is listed in a sticky note on the canvas.
- **"Do you see my keys?"** Pasting stays in the browser. Keys in n8n credentials never appear in the workflow JSON. The key checker returns line numbers, never key values.
