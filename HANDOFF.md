# Flowscope handoff

Status as of **Nov 15, 2026, 2:40 PM PT**. Judging is at **4:00 PM**.

## Links
| What | Where |
|---|---|
| Live app (installable PWA) | https://arushish5-cyber.github.io/flowscope/ |
| GitHub repo (public) | https://github.com/arushiSH5-cyber/flowscope |
| n8n instance | https://flowscope.app.n8n.cloud |
| Pitch deck (6 slides, private until you share it) | https://claude.ai/artifact/HoH9q28k8DDiUQVkD2Nndg |
| Local project folder | `~/Downloads/stack-map` |

## What Flowscope is
See every app your n8n automations touch as a **3D solar system** (your project is the sun, the apps it uses are planets), **fix what's exposed in one click**, and let **five n8n agents** keep watch.

Judging (from the host deck) covers **Idea / Uniqueness**, **Implementation / Does it work?** and **Presentation / Clarity**.

---

## ✅ Done and working

### The app (`flowscope.html`)
- **Tabs:** 🏠 Home · 🪐 Map · 🛠️ Fix · 🤖 Agents · 📚 Learn. On phones they become a bottom tab bar.
- **Home:** what Flowscope does, how it works in 4 steps, where everything is, **Built on n8n** (the real node chains), **Try a real project** (The Coop, Otto, Flowscope), and how to install.
- **Map:** black starfield, twinkling stars, shooting stars (**click empty space** to launch more), a kawaii Sun that looks worried when a key leaked and smiles after the fix, orbiting planets (bigger and closer = used more), and 5 n8n agent satellites.
- **Cute drawn characters, all original:** agents 🛡️ Guard, 🚨 Siren, 🕵️ Inspector, 🤖 Buddy, 🔭 Scout and 🪄 Fixer; hazards: comet (leaked key), UFO (open door), black hole (silent failure), satellite (dead node).
- **Fix:** the Fixer returns a repaired n8n workflow. This morning's demo workflow goes from **27 → 74**.
- **PWA:** installable on laptops and phones, works offline, has its own icon.
- **Sample** = this morning's n8n demo workflow (Lead Machine: Apify, Gemini, OpenRouter, Sheets, Gmail).

### n8n (all 5 workflows imported at flowscope.app.n8n.cloud)
| Agent | Status | Notes |
|---|---|---|
| 🔭 Scout (repo scanner) | ✅ **Published, tested live** | Uses n8n's free Gateway AI credits ($2), no OpenAI key needed. Scans take 6 to 10 s. |
| 🛡️ Guard (push guard) | ✅ **Published, tested live** | Caught a fake AWS key in 2.2 s. **Email step is switched off** (Gmail isn't connected). Watches the `flowscope` and `gitup` repos. |
| 🤖 Buddy (MCP server) | Imported, not published | Needs a Bearer token |
| 🚨 Siren (error alerts) | Imported, not published | Needs Gmail |
| 🕵️ Inspector (weekly audit) | Imported, not published | Needs Gmail and an n8n API key |

### GitHub
- Judge-ready `README.md`: live link and badges, a table matching the judging criteria, an n8n diagram (mermaid), the node list, and today's test results.
- Repo website field, description and topics are set.
- Lint GitHub Action passes on `main`. In our test, the lint, Guard and GitHub push protection all caught the fake key.
- Also in the repo: `SETUP.md` (demo script), `PITCH.md` (competitors and money), and this file.

---

## ⏳ What's left

### Must do before 4:00
1. **Share the deck:** open the deck link → **Share** → give access (or **Export → PDF** for the projector). Judges can't open it until you do.
2. **Practice the demo twice** (script below).
3. **Record a backup video** (about 90 seconds) of the demo flow, in case the Wi-Fi fails. On a Mac, press Cmd+Shift+5 → Record selected portion.

### Nice to have
4. **Gmail for Guard:** in **your own browser**, open https://flowscope.app.n8n.cloud/workflow/uabOeamLfekau9VS → double-click **Email me** → **Sign in with Google** → set **To** to your email → Cmd+S. Then switch the node back on (select it and press **D**) and press **Publish**. Or tell Claude and it'll do the switch-on and publish. Use a personal Gmail if your school account blocks it.
5. **Buddy (MCP):** run `openssl rand -hex 24`, paste the result as a Bearer Auth credential in **Flowscope MCP**, then publish.
6. **Push to `main` for any live Guard demo.** The copy in n8n still has the old step that fails on a brand-new branch's first push. The repo's copy is already fixed, so re-import it to fix that.

### Your idea: a home page with a video
- **Record** the demo (step 3 above) and upload it to YouTube (unlisted) or Loom.
- **Add it to the app's Home tab:** ask Claude to put the video at the top of Home, under the hero.
- **Add it to the README:** put a thumbnail link at the top, like `[![Watch the demo](thumbnail.png)](video link)`. GitHub README files can't play embedded videos, but a GIF works. A screen recording converted to GIF can go straight into the README.
- **Optional:** a short "How we use n8n" video showing the n8n editor with Scout and Guard published.

---

## 🎤 The 3-minute demo
| Time | Do | Say |
|---|---|---|
| 0:00 | Slide 1 | "One person now connects a dozen apps. Can you name everything your workflow touches?" |
| 0:20 | App → Home → **See this morning's n8n demo workflow** | "This is the Lead Machine from this morning. The sun is the workflow; planets are the apps it uses." |
| 0:40 | Tap the **comet** | "An Apify key typed into a node. Anyone you share this with gets it." |
| 1:00 | **Fix** tab → **See it on the map** | "Other scanners stop at a report. We hand you the fixed workflow. 27 → 74, and the sun smiles." |
| 1:30 | Home → **🐔 The Coop** | "Our n8n reads a real repo and an AI Agent explains it, live." |
| 2:00 | Switch to n8n: Scout and Guard **Published** | "Five real n8n workflows. Guard caught a leaked key in 2.2 seconds today." |
| 2:30 | **Agents** tab, then click space for shooting stars | "They keep watch: every push, every failure, every Monday." |
| 2:50 | Last slide | "Other scanners report. Flowscope fixes. Built on n8n, and it checks n8n." |

## 🔌 Showing n8n to judges (have these tabs open before 4:00)

Sign in to n8n in the browser you present from, then open these tabs in order:
1. **Flowscope app**: https://arushish5-cyber.github.io/flowscope/
2. **n8n Overview** (all 5 workflows): https://flowscope.app.n8n.cloud/home/workflows
3. **Scout's executions**: open *Flowscope: scan repo* → **Executions** tab
4. **Guard's catch**: open *Flowscope: push guard* (https://flowscope.app.n8n.cloud/workflow/uabOeamLfekau9VS) → **Executions** → the run that caught the fake AWS key → click **Check added lines** to show its output

### The live n8n moment (about 40 seconds)
| Do | Say |
|---|---|
| In the app: Home → **🐔 The Coop** | "This button calls my n8n workflow's webhook." |
| While it loads, switch to **tab 3** (Scout executions) and refresh | "Here's the run happening right now in n8n." |
| Click the newest run: Webhook → HTTP Request → Code → **AI Agent** → Respond, all green | "n8n downloads the repo from GitHub, the AI Agent node reads it, and Respond to Webhook sends the map back." |
| Back to the app: The Coop solar system appears | "Everything you see came out of that n8n run." |
| **Tab 4**: Guard's run that caught the key | "Every git push hits this n8n webhook. It caught a fake AWS key in 2.2 seconds." |

### "How is n8n central to this?"
- **n8n is the whole backend.** The app is one static page. Everything that touches the outside world runs in n8n: the GitHub API, the AI, email, schedules and the MCP server. We have **no server of our own**.
- **We use the n8n features that matter most:** Webhook + Respond to Webhook, **AI Agent** (on n8n's built-in AI credits, so we needed no OpenAI key), Code, HTTP Request, Error Trigger, Schedule Trigger, the n8n API, and **MCP Server Trigger**.
- **It's built for n8n users too.** Flowscope reads n8n workflow JSON, and the Fixer hands back an **n8n workflow you paste straight back into n8n**.
- **Without n8n,** Scout, Guard, Siren, Inspector and Buddy don't exist; you'd just have a picture.

### If they ask about errors
- n8n emailed us that **push guard ran into an error**. That happened when we deleted our test branch: GitHub sends a "branch deleted" push with no code in it. **This is exactly the problem Siren solves**, and the Fix tab flags it as *"Nobody hears when this breaks."* The repo copy now skips deleted branches. To fix the n8n copy: open push guard → double-click **Get the changes** → **Settings** → **On Error** → *Continue* → save.
- GitHub's **"Flowscope lint failed"** email at 1:57 PM was our **deliberate test**: we pushed a fake AWS key on a test branch, and the lint Action blocked it, just as it should.

## ❓ Likely judge questions
- **"Isn't this just n8n audit?"** n8n audit is instance-wide and for owners. We work per workflow, for beginners, visually, we **fix** it, and we cover the code too.
- **"Does it see my keys?"** Pasted workflows stay in the browser. Keys stored in n8n credentials never appear in the workflow JSON. Our key checker reports line numbers, never key values.
- **"Does it break my workflow?"** You get a copy, and every change is listed in a sticky note on the canvas.
- **"How does it make money?"** Free: map, fix and lint. Pro (~$12/mo): we run the agents for you. Agency (~$79/mo): branded client reports. Prices are ideas, not tested.

## 🛠️ How to change things
- **App:** edit `flowscope.html`, then `git add -A && git commit -m "..." && git push`. GitHub Pages updates in about a minute.
- **Workflows:** edit `workflows/*.json`, then run `node scripts/embed-workflows.mjs` (CI checks this), then commit and push.
- **Lint locally:** `npm run lint`. The 5 warnings left are intentional placeholders (`you@example.com`) and our two public webhooks.
- **Preview locally:** `python3 -m http.server 8130 --directory ~/Downloads/stack-map`, then open http://localhost:8130/flowscope.html
