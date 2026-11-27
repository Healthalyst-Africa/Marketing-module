// Check for the icons-get-semantic-names eval: @healthalyst/icons exports a
// webinar icon under a semantic name ending in "Icon".
import { readFileSync } from "node:fs";

const iconExports = readFileSync("packages/icons/src/index.ts", "utf8");
if (!/\bWebinar\w*Icon\b/.test(iconExports)) {
  console.error(
    "packages/icons/src/index.ts has no semantic export such as WebinarIcon."
  );
  process.exit(1);
}
console.log("@healthalyst/icons exports a semantic webinar icon.");
