import { glob } from "glob";

// Utils
import { findProjectRoot } from "./utils/index.js";

export async function findCodemods() {
  const rootDir = await findProjectRoot();

  if (!rootDir) {
    console.error("Root directory (package.json) not found.");
    return;
  }

  const codemods = await glob("**/.codemodrc.json", {
    ignore: "node_modules/**",
  });
  return codemods;
}

const print = async () => {
  const codemods = await findCodemods();
  console.log(codemods);
};

print();
