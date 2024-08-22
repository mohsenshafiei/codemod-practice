import { findUp } from "find-up";
import path from "path";

export async function findProjectRoot() {
  const rootPath = await findUp("package.json", { cwd: process.cwd() });
  return rootPath ? path.dirname(rootPath) : process.cwd();
}
