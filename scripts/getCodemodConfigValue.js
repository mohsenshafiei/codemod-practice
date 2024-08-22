import { readFile } from "node:fs/promises";

// Utils
import { findCodemods } from "./findCodemods.js";

export async function getCodemodConfigValue(key) {
  const codemodPaths = await findCodemods();

  if (!codemodPaths || codemodPaths.length === 0) {
    console.error("No codemodrc.json file found.");
    return null;
  }

  const codmodValues = await Promise.all(
    codemodPaths.map(async (path) => {
      const codemodRcContent = await readFile(path, {
        encoding: "utf-8",
      }).catch(() => null);
      if (!codemodRcContent) {
        console.error("Failed to read the codemodrc.json file.");
        return null;
      }
      const codemodConfig = await JSON.parse(codemodRcContent);
      return codemodConfig[key] !== undefined ? codemodConfig[key] : null;
    })
  );
  return codmodValues;
}
