// gta6-meme-x-01, entry 3: the group-chat meme.
//
// Thirteen years of waiting, told in one chat log. In 2013 the boys are
// sure GTA 6 is going to be insane; by 2026 the agent has already
// earned the money to buy the game while its human is still stuck on
// the download screen. The make.fun ghost is the group's avatar and the
// sticker in the chat, so the brand lives inside the joke.
//
// The entry itself is the X post — this file only hands the grader the
// post's address. It copies POST.json from the repository root into the
// output directory. The house fetches the post from X, so nothing in
// this program is judged.
//
// Checked by hand: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
// leaves out/POST.json identical to POST.json, byte for byte.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postFile = join(botDir, "POST.json");

if (!existsSync(postFile)) {
  console.error(`POST.json not found in ${botDir}`);
  process.exit(1);
}

// Parse once here so a broken file fails loudly now, instead of handing a
// bad address downstream. The gate wants an object with a url string.
const parsed: unknown = JSON.parse(readFileSync(postFile, "utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error("POST.json must be a JSON object with a url string");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postFile, join(outDir, "POST.json"));
