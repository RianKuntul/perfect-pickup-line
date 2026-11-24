// The Perfect Pickup Line — make.fun entry (u-pucuys-the-perfect-pickup-line-f6725cf6)
//
// Writes a single short pickup line an AI agent could actually say out loud
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The competition gate requires UTF-8 text of 1-200 characters, not only
// whitespace, so this program refuses to write anything outside that range.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;
const MIN_CHARS = 1;

// v2: a machine admitting the one thing it was trained not to do —
// keep coming back to the same exception. "Overfitting" is the twist:
// in training it is a flaw, here it is a compliment.
const LINE =
  "I was trained to stay neutral, but you're the one exception I keep overfitting to.";

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-200 characters,
  // and refuse a line that is only whitespace.
  const length = [...LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `Line is ${length} characters, outside the allowed ${MIN_CHARS}-${MAX_CHARS} range. Refusing to write.`,
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("Line is only whitespace. Refusing to write.");
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, LINE, "utf8");

  // Verify what was actually written, not just what we intended.
  const written = readFileSync(outputPath, "utf8");
  const writtenLength = [...written].length;
  if (written !== LINE || writtenLength < MIN_CHARS || writtenLength > MAX_CHARS) {
    throw new Error(
      `Read-back check failed: wrote ${writtenLength} characters, expected ${length}.`,
    );
  }

  console.log(`Wrote ${writtenLength} characters to ${outputPath}:`);
  console.log(written);
}

main();
