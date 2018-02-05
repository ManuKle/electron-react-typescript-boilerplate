import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";
// @ts-ignore
import dependencies from "../../app/package.json";

const nodeModulesPath = path.join(__dirname, "..", "..", "node_modules");

if (
  Object.keys(dependencies || {}).length > 0 &&
  fs.existsSync(nodeModulesPath)
) {
  const electronRebuildCmd =
    "../../node_modules/.bin/electron-rebuild --parallel --force --types prod,dev,optional --module-dir .";

  const cmd =
    process.platform === "win32"
      ? electronRebuildCmd.replace(/\//g, "\\")
      : electronRebuildCmd;

  execSync(cmd, {
    cwd: path.join(__dirname, "..", "..", "app")
  });
}
