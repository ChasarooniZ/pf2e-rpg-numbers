#!/usr/bin/env node
//Note this is just ~~stolen~~ borrowed from Vauxs' `Trigger Animations`
import { readFileSync } from "fs";

const [, , version, versionPrefix, changelogPath] = process.argv;

if (!version || !versionPrefix || !changelogPath) {
  console.error({ version, versionPrefix, changelogPath });
  console.error(
    "Usage: extract-changelog.mjs <version> <version_prefix> <changelog_path>",
  );
  process.exit(1);
}

const content = readFileSync(changelogPath, "utf8");
const lines = content.split("\n");

const header = `${versionPrefix}${version}`;
let start = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith(header)) {
    start = i + 1;
    break;
  }
}

if (start === -1) {
  console.error(`Version "${version}" not found in changelog.`);
  process.exit(1);
}

const sectionLines = [];
for (let i = start; i < lines.length; i++) {
  if (lines[i].startsWith(versionPrefix) && lines[i] !== lines[start - 1])
    break;
  sectionLines.push(lines[i]);
}

// Trim leading/trailing blank lines while preserving internal whitespace
let trimStart = 0;
while (trimStart < sectionLines.length && sectionLines[trimStart].trim() === "")
  trimStart++;
let trimEnd = sectionLines.length;
while (trimEnd > trimStart && sectionLines[trimEnd - 1].trim() === "")
  trimEnd--;

const changelog = sectionLines.slice(trimStart, trimEnd).join("\n");

// Write to GITHUB_OUTPUT if available, otherwise print to stdout
const outputFile = process.env.GITHUB_OUTPUT;
if (outputFile) {
  const { appendFileSync } = await import("fs");
  const delimiter = `EOF_${Date.now()}`;
  appendFileSync(
    outputFile,
    `changelog<<${delimiter}\n${changelog}\n${delimiter}\n`,
  );
} else {
  console.log(changelog);
}
