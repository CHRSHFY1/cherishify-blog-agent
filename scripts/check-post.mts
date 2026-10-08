/**
 * Deterministischer Qualitäts-Check für einen Blog-Entwurf.
 *
 *   bunx tsx scripts/check-post.mts <worktree-pfad> <slug>
 *
 * Prüft Struktur, SEO-Längen, interne Links, Markenregeln. Exit-Code 1 bei FAIL.
 * Typ-/Lint-Prüfung der Post-Datei übernimmt check-post.sh.
 */
import { existsSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { pathToFileURL } from "url";

const [, , wtArg, slug] = process.argv;
if (!wtArg || !slug) {
  console.error("Usage: check-post.mts <worktree> <slug>");
  process.exit(2);
}
const wt = resolve(wtArg);
const file = join(wt, "src/content/blog/posts", `${slug}.ts`);

const results: Array<{ level: "PASS" | "WARN" | "FAIL"; msg: string }> = [];
const pass = (msg: string) => results.push({ level: "PASS", msg });
const warn = (msg: string) => results.push({ level: "WARN", msg });
const fail = (msg: string) => results.push({ level: "FAIL", msg });
const check = (ok: boolean, okMsg: string, failMsg: string) => (ok ? pass(okMsg) : fail(failMsg));

if (!existsSync(file)) {
  console.log(`FAIL Post-Datei fehlt: ${file}`);
  process.exit(1);
}

const mod = await import(pathToFileURL(file).href);
const post = mod.default as Record<string, any>;

// --- Registrierung ---
const indexSrc = readFileSync(join(wt, "src/content/blog/index.ts"), "utf8");
check(indexSrc.includes(`posts/${slug}"`), "In src/content/blog/index.ts registriert", "Nicht in src/content/blog/index.ts importiert/registriert");

// --- Metadaten ---
check(post.slug === slug, "Slug stimmt mit Dateiname überein", `Slug '${post.slug}' ≠ Dateiname '${slug}'`);
if (/\b20\d{2}\b/.test(slug)) warn("Slug enthält eine Jahreszahl — nur sinnvoll, wenn der Beitrag jährlich neu geschrieben wird");
const seoTitle: string = post.seoTitle ?? `${post.title} | CHERISHIFY`;
check(seoTitle.length <= 60, `SEO-Titel ${seoTitle.length} Zeichen (≤ 60)`, `SEO-Titel zu lang: ${seoTitle.length} Zeichen (max. 60)`);
const meta: string = post.metaDescription ?? post.excerpt ?? "";
check(meta.length >= 140 && meta.length <= 155, `Meta-Description ${meta.length} Zeichen (140–155)`, `Meta-Description ${meta.length} Zeichen — erwartet 140–155`);
check(typeof post.excerpt === "string" && post.excerpt.length >= 80 && post.excerpt.length <= 220, "Excerpt-Länge ok", "Excerpt fehlt oder nicht 80–220 Zeichen");
check(/^\d{4}-\d{2}-\d{2}/.test(post.publicationDate ?? ""), "publicationDate im ISO-Format", "publicationDate fehlt oder ist kein ISO-Datum");
check(post.author?.name === "Martin Pell" && post.author?.type === "Person", "Autor: Martin Pell (Person)", "Autor muss AUTHORS.martinPell sein");
check(post.draft !== true, "draft ist nicht true (Beitrag im Review sichtbar)", "draft: true blendet den Beitrag auch lokal aus — entfernen");
check(Array.isArray(post.tags) && post.tags.length >= 2, "Tags gesetzt", "Mindestens 2 Tags setzen");
check(Boolean(post.heroImage) && Boolean(post.heroImageAlt), "heroImage + heroImageAlt gesetzt", "heroImage und heroImageAlt sind Pflicht");
if (post.heroImage?.startsWith("/")) {
  check(existsSync(join(wt, "public", post.heroImage)), `heroImage existiert (${post.heroImage})`, `heroImage-Datei fehlt: public${post.heroImage}`);
}

// --- Inhalt ---
const html: string = post.content ?? "";
const text = html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");
const words = text.trim().split(/\s+/).length;
check(words >= 900, `${words} Wörter${words < 1200 ? " (Ziel ≥ 1200)" : ""}`, `Nur ${words} Wörter — mindestens 900, Ziel 1200–2000`);
if (words >= 900 && words < 1200) warn(`${words} Wörter — Ziel laut Playbook ≥ 1200`);
if (words > 2600) warn(`${words} Wörter — sehr lang, auf Straffbarkeit prüfen`);

const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
check(h2s.length >= 4, `${h2s.length} H2-Abschnitte`, `Nur ${h2s.length} H2-Abschnitte — mindestens 4`);
check(!/<h1[\s>]/i.test(html), "Kein H1 im Inhalt (Seite setzt den H1 selbst)", "H1 im Inhalt entfernen — die Seite rendert den Titel als H1");
check(h2s.some((h) => /häufige fragen|faq/i.test(h)), "FAQ-Abschnitt vorhanden", "FAQ-Abschnitt fehlt (H2 'Häufige Fragen')");

// --- Interne Links ---
const sitemap = existsSync(join(wt, "public/sitemap.xml")) ? readFileSync(join(wt, "public/sitemap.xml"), "utf8") : "";
const known = new Set<string>([...sitemap.matchAll(/<loc>https:\/\/cherishify\.eu([^<]*)<\/loc>/g)].map((m) => m[1] || "/"));
known.add(`/blog/${slug}`);
const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, "") || "/");
const uniqueInternal = [...new Set(links)];
check(uniqueInternal.length >= 3, `${uniqueInternal.length} verschiedene interne Links`, `Nur ${uniqueInternal.length} interne Links — mindestens 3`);
const broken = uniqueInternal.filter((l) => !known.has(l));
check(broken.length === 0, "Alle internen Links zeigen auf existierende Routen", `Unbekannte interne Ziele: ${broken.join(", ")}`);
check(/href="\/kontakt/.test(html) || /href="\/preise/.test(html), "Link auf /kontakt oder /preise vorhanden", "Kein Link auf /kontakt oder /preise");

// --- Marke & Platzhalter ---
const banned = ["disruptiv", "disruptive", "game-changer", "gamechanger", "revolutionär", "ki-driven", "ki-gestützte revolution", "maximiert ihre"];
const hits = banned.filter((b) => text.toLowerCase().includes(b));
check(hits.length === 0, "Keine verbotenen Buzzwords", `Verbotene Begriffe laut Markenrichtlinie: ${hits.join(", ")}`);
const placeholders = ["todo", "lorem", "xxx", "[quelle", "tbd", "platzhalter"];
const ph = placeholders.filter((p) => text.toLowerCase().includes(p));
check(ph.length === 0, "Keine Platzhaltertexte", `Platzhalter im Text: ${ph.join(", ")}`);
if (/\bdu\b|\bdein(e|en|em|er)?\b/i.test(text)) warn("Duzen entdeckt — Markenstimme verlangt die Anrede 'Sie'");
if (/(\d+\s?%)/.test(text) && !/quelle|laut|studie|erhebung|umfrage|unsere kampagnen|erfahrung/i.test(text)) {
  warn("Prozentangaben ohne erkennbare Quellen-/Erfahrungsangabe im Text — im Review-Report belegen");
}
if (/steuer|lohnsteuer|sozialversicherung/i.test(text) && !/ersetzt?\s+keine\s+steuerberatung|keine steuerberatung/i.test(text)) {
  fail("Steuerthema ohne Hinweis 'ersetzt keine Steuerberatung'");
}

// --- Ausgabe ---
for (const r of results) console.log(`${r.level.padEnd(4)} ${r.msg}`);
const fails = results.filter((r) => r.level === "FAIL").length;
const warns = results.filter((r) => r.level === "WARN").length;
console.log(`\n${fails} FAIL, ${warns} WARN, ${results.length - fails - warns} PASS — ${words} Wörter, ${h2s.length} H2, ${uniqueInternal.length} interne Links`);
process.exit(fails > 0 ? 1 : 0);
