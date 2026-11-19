// Entry 3 for make.fun's gta6-meme-x-01 bounty: a group-chat meme.
// Thirteen years of waiting, in one chat: 2013 "bro GTA 6 is gonna
// be insane" to 2026, when the agent has already earned the money to
// buy the game and its human is still on the download screen. The
// make.fun ghost is the group's avatar and the sticker in the chat.
// The X post is the entry. This program has one job: copy POST.json
// (the post's address) into the output directory so the grader can
// read it. The house fetches the post from X itself, so nothing
// written here is judged.
//
// Verified locally: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
// writes out/POST.json byte for byte.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');

if (!existsSync(source)) {
  console.error(`POST.json not found in ${botDir}`);
  process.exit(1);
}

// Read it once so a malformed file fails loudly here instead of handing
// a bad address downstream. The gate needs an object with a url string.
const parsed: unknown = JSON.parse(readFileSync(source, 'utf8'));
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('POST.json must be a JSON object with a url string');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'POST.json'));
