#!/usr/bin/env node
/**
 * Delta-Deploy für Hostinger: statt den gesamten dist/-Ordner neu hochzuladen,
 * wird nur das gepackt, was sich seit dem letzten Upload geändert hat.
 *
 *   node scripts/deploy-delta.mjs zip      [--site <pfad>]  → out/blog-update.zip
 *   node scripts/deploy-delta.mjs snapshot [--site <pfad>]  → state/manifest.json neu schreiben
 *
 * `zip` vergleicht <site>/dist mit state/manifest.json (= Stand der Live-Seite).
 * `snapshot` NACH jedem erfolgreichen Upload ausführen (auch nach einem vollständigen
 * Deploy), damit das Manifest wieder dem Live-Stand entspricht.
 *
 * Upload: ZIP in /public_html laden → Rechtsklick → "Extract". Nichts löschen:
 * alle Assets haben Hash-Dateinamen, alte Dateien bleiben ungenutzt liegen.
 *
 * Nur Node-Builtins — keine Abhängigkeiten.
 */

import { createHash } from "crypto";
import { execFileSync } from "child_process";
import {
  copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync,
} from "fs";
import { dirname, join, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const mode = args[0];
const siteIdx = args.indexOf("--site");
const SITE = resolve(siteIdx >= 0 ? args[siteIdx + 1] : process.env.SITE_REPO || join(homedir(), "cherishify-design-lab"));

const DIST = join(SITE, "dist");
const MANIFEST = join(ROOT, "state/manifest.json");
const STAGING = join(ROOT, "out/.staging");
const ZIP_OUT = join(ROOT, "out/blog-update.zip");
/** Ab dieser Anzahl geänderter Dateien ist ein kompletter Deploy sinnvoller. */
const WARN_THRESHOLD = 60;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === ".DS_Store") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function hashDist() {
  if (!existsSync(DIST)) {
    console.error(`dist/ fehlt (${DIST}) — zuerst im Website-Repo \`npm run build\` ausführen.`);
    process.exit(1);
  }
  const files = {};
  for (const file of walk(DIST)) {
    const rel = relative(DIST, file).split("\\").join("/");
    files[rel] = createHash("sha256").update(readFileSync(file)).digest("hex");
  }
  return files;
}

function snapshot() {
  const files = hashDist();
  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify({ generatedAt: new Date().toISOString(), files }, null, 2) + "\n", "utf8");
  console.log(`[deploy-delta] Manifest geschrieben: ${Object.keys(files).length} Dateien → state/manifest.json`);
}

function zip() {
  if (!existsSync(MANIFEST)) {
    console.error("state/manifest.json fehlt. Einmalig `snapshot` ausführen, wenn dist/ dem Live-Stand entspricht.");
    process.exit(1);
  }
  const previous = JSON.parse(readFileSync(MANIFEST, "utf8")).files;
  const current = hashDist();

  const added = Object.keys(current).filter((f) => !(f in previous));
  const changed = Object.keys(current).filter((f) => f in previous && previous[f] !== current[f]);
  const removed = Object.keys(previous).filter((f) => !(f in current));
  const upload = [...added, ...changed].sort();

  if (upload.length === 0) {
    console.log("[deploy-delta] Keine Änderungen gegenüber dem letzten Upload — nichts zu tun.");
    return;
  }

  rmSync(STAGING, { recursive: true, force: true });
  rmSync(ZIP_OUT, { force: true });
  for (const rel of upload) {
    const target = join(STAGING, rel);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(DIST, rel), target);
  }
  mkdirSync(dirname(ZIP_OUT), { recursive: true });
  // "." statt "*", damit versteckte Dateien (.htaccess) mitgepackt werden.
  execFileSync("zip", ["-r", "-q", ZIP_OUT, "."], { cwd: STAGING });
  rmSync(STAGING, { recursive: true, force: true });

  const sizeKb = Math.round(statSync(ZIP_OUT).size / 1024);
  console.log(`\n[deploy-delta] out/blog-update.zip (${sizeKb} KB) — ${upload.length} Dateien:\n`);
  for (const f of added) console.log(`  + ${f}`);
  for (const f of changed) console.log(`  ~ ${f}`);
  if (removed.length) {
    console.log(`\n  (${removed.length} alte Dateien nicht mehr im Build — bleiben harmlos auf dem Server liegen)`);
  }
  if (upload.includes(".htaccess")) {
    console.log("\n  ⚠ .htaccess hat sich geändert — im File Manager 'Versteckte Dateien anzeigen' aktivieren.");
  }
  if (upload.length > WARN_THRESHOLD) {
    console.log(
      `\n  ⚠ Mehr als ${WARN_THRESHOLD} geänderte Dateien — das Manifest ist vermutlich veraltet oder es wurde ` +
        "mehr als ein Beitrag geändert. Ein vollständiger Deploy (DEPLOY.md im Website-Repo) ist dann sicherer.",
    );
  }
  console.log(
    "\nNächste Schritte: 1) ZIP in /public_html hochladen und entpacken  2) ./scripts/mark-deployed.sh ausführen  " +
      "3) state/manifest.json committen",
  );
}

if (mode === "snapshot") snapshot();
else if (mode === "zip") zip();
else {
  console.error("Usage: deploy-delta.mjs <zip|snapshot> [--site <pfad>]");
  process.exit(1);
}
