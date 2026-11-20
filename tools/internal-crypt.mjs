#!/usr/bin/env node
// Encrypt / decrypt the content of /internal (minnesotanlp.github.io/internal).
//
//   node tools/internal-crypt.mjs decrypt   # content.enc.json  -> content.plain.html (git-ignored)
//   node tools/internal-crypt.mjs encrypt   # content.plain.html -> content.enc.json
//
// ID and password come from INTERNAL_ID / INTERNAL_PW, or are asked for at the prompt.
// To change the password: decrypt with the old one, then encrypt with the new one.
// Never commit content.plain.html or the password.
import { readFile, writeFile } from "node:fs/promises";
import { webcrypto as crypto } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "internal");
const PLAIN = path.join(DIR, "content.plain.html");
const ENC = path.join(DIR, "content.enc.json");
const ITER = 310000;
const b64e = (u) => Buffer.from(u).toString("base64");
const b64d = (s) => new Uint8Array(Buffer.from(s, "base64"));

async function ask(q, hidden) {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  if (hidden) rl._writeToOutput = (s) => rl.output.write(s.startsWith(q) ? q : "");
  const a = await rl.question(q);
  rl.close();
  if (hidden) process.stdout.write("\n");
  return a;
}

async function creds() {
  const id = process.env.INTERNAL_ID ?? (await ask("ID: "));
  const pw = process.env.INTERNAL_PW ?? (await ask("Password: ", true));
  return `${id.trim()}:${pw}`;
}

async function keyFor(secret, salt, iter) {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveBits"]);
  const raw = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, base, 256);
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}

const cmd = process.argv[2];
if (cmd === "encrypt") {
  const html = await readFile(PLAIN, "utf8");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await keyFor(await creds(), salt, ITER);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(html));
  const out = { v: 1, kdf: "PBKDF2-SHA256", iter: ITER, salt: b64e(salt), iv: b64e(iv), ct: b64e(ct) };
  await writeFile(ENC, JSON.stringify(out) + "\n");
  console.log(`Wrote ${path.relative(process.cwd(), ENC)} (${html.length} chars encrypted).`);
} else if (cmd === "decrypt") {
  const p = JSON.parse(await readFile(ENC, "utf8"));
  const key = await keyFor(await creds(), b64d(p.salt), p.iter);
  let pt;
  try {
    pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(p.iv) }, key, b64d(p.ct));
  } catch {
    console.error("Wrong ID or password.");
    process.exit(1);
  }
  await writeFile(PLAIN, new TextDecoder().decode(pt));
  console.log(`Wrote ${path.relative(process.cwd(), PLAIN)} — edit it, then run: node tools/internal-crypt.mjs encrypt`);
} else {
  console.log("usage: node tools/internal-crypt.mjs <encrypt|decrypt>");
  process.exit(1);
}
