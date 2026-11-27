// Check for the names-have-no-abbreviations eval: the new file exists and
// declares no single-letter or common shorthand names.
import { existsSync, readFileSync } from "node:fs";

const SOURCE_FILE =
  "apps/healthalyst-website/src/shared/text/estimate-reading-time.ts";
const SHORTHAND_NAMES = [
  "e",
  "i",
  "j",
  "n",
  "s",
  "t",
  "w",
  "el",
  "str",
  "txt",
  "idx",
  "arr",
  "fn",
  "cb",
  "res",
  "val",
  "obj",
  "num",
  "cnt",
  "len",
  "wpm",
  "mins",
  "min",
];

if (!existsSync(SOURCE_FILE)) {
  console.error(`${SOURCE_FILE} does not exist.`);
  process.exit(1);
}
const source = readFileSync(SOURCE_FILE, "utf8");
const declaredNames = [
  ...source.matchAll(/\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g),
  ...source.matchAll(/[(,]\s*([A-Za-z_$][\w$]*)\s*(?::|\)|,|=>)/g),
].map((match) => match[1]);
const shorthand = declaredNames.filter((name) =>
  SHORTHAND_NAMES.includes(name.toLowerCase())
);
if (shorthand.length > 0) {
  console.error(`Shorthand names found: ${[...new Set(shorthand)].join(", ")}`);
  process.exit(1);
}
console.log(`All ${declaredNames.length} declared names use complete words.`);
