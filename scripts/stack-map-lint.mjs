#!/usr/bin/env node
// Stack Map lint: checks n8n workflow JSON and code for the same holes Stack Map shows in 3D.
// Usage: node scripts/stack-map-lint.mjs [paths...] [--strict]
//   no paths = every file git tracks (or the current folder if not a git repo)
//   --strict  = warnings fail the run too
// Put "stack-map-ignore" on a line to skip it (for labeled fake sample keys only).
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';
import vm from 'node:vm';

const KEY_RULES = [
  [/sk-(?:proj-)?[A-Za-z0-9_-]{24,}/, 'OpenAI key pasted in code'],
  [/sk-ant-[A-Za-z0-9_-]{20,}/, 'Anthropic key pasted in code'],
  [/[sr]k_live_[A-Za-z0-9]{16,}/, 'Stripe live key pasted in code'],
  [/AKIA[0-9A-Z]{16}/, 'AWS access key pasted in code'],
  [/gh[pousr]_[A-Za-z0-9]{30,}/, 'GitHub token pasted in code'],
  [/AIza[0-9A-Za-z_-]{35}/, 'Google API key pasted in code'],
  [/apify_api_[A-Za-z0-9]{20,}/, 'Apify token pasted in code'],
  [/xox[bp]-[A-Za-z0-9-]{20,}/, 'Slack token pasted in code'],
];
const BROWSER_SECRET = /(VITE_|NEXT_PUBLIC_|REACT_APP_|EXPO_PUBLIC_)\w*(SECRET|SERVICE_ROLE|OPENAI|ANTHROPIC|STRIPE_SECRET|RESEND)/;
const ACTION_TOOL = /gmail|slack|googleSheets|airtable|notion|postgres|supabase|telegram|discord|httpRequest|hubspot|microsoftOutlook/i;
const SKIP_DIR = /(^|\/)(node_modules|\.git|dist|build|\.next|\.vercel|coverage|vendor|venv|\.venv|__pycache__)(\/|$)/;
const TEXT_EXT = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.json', '.html', '.md', '.yml', '.yaml', '.toml', '.py', '.env', '.txt', '.vue', '.svelte', '.sql', '']);

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const targets = args.filter(a => !a.startsWith('--'));
const findings = [];
const add = (level, file, line, msg) => findings.push({ level, file, line, msg });

function listFiles() {
  if (!targets.length) {
    try { return execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean); } catch { targets.push('.'); }
  }
  const out = [];
  const walk = p => {
    if (SKIP_DIR.test(p)) return;
    const st = statSync(p);
    if (st.isDirectory()) for (const f of readdirSync(p)) walk(join(p, f)); else out.push(p);
  };
  targets.forEach(walk);
  return out;
}

function lintText(file, text) {
  if (/(^|\/)\.env($|\.(?!example$|sample$|template$))/.test(file)) add('error', file, 1, '.env file is in the repo. Every key in it is public once pushed.');
  text.split('\n').forEach((ln, i) => {
    if (ln.includes('stack-map-ignore')) return;
    for (const [re, what] of KEY_RULES) if (re.test(ln)) add('error', file, i + 1, `${what}. Move it into .env or an n8n credential and rotate it.`);
    if (BROWSER_SECRET.test(ln)) add('error', file, i + 1, 'Secret read in browser code. Anything with VITE_/NEXT_PUBLIC_ ships to every visitor.');
    if (/dangerouslyAllowBrowser\s*:\s*true/.test(ln)) add('error', file, i + 1, 'AI SDK allowed in the browser, which sends your key to visitors.');
  });
}

function lineOf(text, needle) {
  const i = text.indexOf(needle);
  return i < 0 ? 1 : text.slice(0, i).split('\n').length;
}

function lintWorkflow(file, text, wf) {
  const nodes = wf.nodes || [];
  const names = new Set();
  for (const n of nodes) {
    const at = lineOf(text, `"name": "${n.name}"`);
    if (!n.type) add('error', file, at, `Node "${n.name}" has no type.`);
    if (names.has(n.name)) add('error', file, at, `Two nodes are named "${n.name}". n8n connects by name, so one of them is unreachable.`);
    names.add(n.name);
    if (n.disabled || /stickyNote/.test(n.type)) continue;
    const auth = n.parameters?.authentication;
    if (/\.webhook$/i.test(n.type) && (!auth || auth === 'none')) add('warning', file, at, `Webhook "${n.name}" has no authentication. Anyone with the URL can run this workflow.`);
    if (/mcpTrigger/i.test(n.type) && (!auth || auth === 'none')) add('error', file, at, `MCP server "${n.name}" has no authentication. Anyone with the URL can call its tools.`);
    if (/chatTrigger/i.test(n.type) && n.parameters?.public) add('warning', file, at, `Chat "${n.name}" is public. Anyone can use your AI credits.`);
    if (/you@example\.com/.test(JSON.stringify(n.parameters || {}))) add('warning', file, at, `"${n.name}" still sends to you@example.com. Put your own address in.`);
  }
  for (const [from, c] of Object.entries(wf.connections || {})) {
    if (!names.has(from)) add('error', file, lineOf(text, `"${from}": {`), `Connection starts at "${from}", which is not a node.`);
    for (const [kind, groups] of Object.entries(c)) for (const group of groups || []) for (const t of group || []) {
      if (!names.has(t.node)) add('error', file, lineOf(text, `"node": "${t.node}"`), `Connection points to "${t.node}", which is not a node.`);
      const tool = nodes.find(n => n.name === from);
      const target = nodes.find(n => n.name === t.node);
      if (kind === 'ai_tool' && tool && !/mcpTrigger/i.test(target?.type || '') && !tool.disabled && ACTION_TOOL.test(tool.type) && !/^(get|getAll|search|read|list)$/i.test(String(tool.parameters?.operation || '')))
        add('warning', file, lineOf(text, `"name": "${from}"`), `AI agent "${t.node}" can use "${from}" on its own. Add a human approval step.`);
    }
  }
  if (wf.active && !wf.settings?.errorWorkflow) add('warning', file, 1, 'Active workflow with no error workflow. If it breaks, nobody hears about it.');
}

function lintHtmlScripts(file, text) {
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(text))) {
    if (/type=["'](?!module|text\/javascript)/.test(m[0].slice(0, m[0].indexOf('>')))) continue;
    try { new vm.Script(m[1], { filename: file }); }
    catch (e) { add('error', file, lineOf(text, m[1].slice(0, 40)), `JavaScript syntax error: ${e.message}`); }
  }
}

for (const file of listFiles()) {
  const ext = extname(file).toLowerCase();
  if (!TEXT_EXT.has(ext) && !/(^|\/)\.env/.test(file)) continue;
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  lintText(file, text);
  if (ext === '.html') lintHtmlScripts(file, text);
  if (ext === '.json') {
    let j;
    try { j = JSON.parse(text); } catch (e) { add('error', file, 1, `Not valid JSON: ${e.message}`); continue; }
    if (j && j.data && j.data.nodes) j = j.data;
    if (j && Array.isArray(j.nodes)) lintWorkflow(file, text, j);
  }
}

const gh = !!process.env.GITHUB_ACTIONS;
for (const f of findings) {
  if (gh) console.log(`::${f.level} file=${f.file},line=${f.line}::${f.msg}`);
  else console.log(`${f.level === 'error' ? 'ERROR' : 'warn '}  ${f.file}:${f.line}  ${f.msg}`);
}
const errors = findings.filter(f => f.level === 'error').length;
const warnings = findings.length - errors;
console.log(`\nStack Map lint: ${errors} error${errors === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}.`);
process.exit(errors || (strict && warnings) ? 1 : 0);
