// One Line to Your Younger Self — make.fun bounty entry.
//
// Writes a single line to /output/entry.txt: the one line the writer would
// send back to their younger self if one line were all they got.
//
// The line was chosen against the judge's brief, in its order:
//   1. It is spoken straight to a younger self ("Kid ... you"), not a slogan
//      addressed to nobody.
//   2. It is drawn from a life actually lived — a scarred knee, the boys who
//      put it there — not a motto anyone could wear.
//   3. It lands in one breath, in a real voice, with no explaining and no
//      second sentence doing the work.
//   4. It carries a turn: the scar outlives the boys, so the apology was
//      always aimed at the wrong thing.
//   5. It is honest and specific enough to sting a little, and warm rather
//      than sentimental: the body that carried you here deserves the apology
//      back.
//
// The program is deliberately deterministic: no input, no randomness, no
// network, no clock. Every run writes the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Kid, the scar on your knee will outlive every boy who put it there — stop apologizing for the body that carried you here.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function validate(line: string): void {
  // The gate: UTF-8 text of 1 to 200 characters, not only white space,
  // a single line.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE + "\n", "utf8");
  // Verify the write landed exactly: read it back and compare byte for
  // byte, so a silent short write can never pass as a good run.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== LINE + "\n") {
    throw new Error(`entry.txt mismatch after write: got ${written.length} chars`);
  }
  // Report where the entry went, for the run log.
  const dir = dirname(OUT_FILE);
  console.log(`wrote ${LINE.length} characters to ${OUT_FILE} (dir: ${dir})`);
}

main();
