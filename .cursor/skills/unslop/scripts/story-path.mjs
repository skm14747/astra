import { existsSync, realpathSync } from "node:fs";
import { isAbsolute, join, normalize, relative, sep } from "node:path";

export function resolveStoryFile(root, requestPath) {
  const target = normalize(join(root, requestPath.replace(/^\/__story\//, "/")));
  if (!existsSync(target)) return null;
  let realRoot;
  let realTarget;
  try {
    realRoot = realpathSync(root);
    realTarget = realpathSync(target);
  } catch {
    return null;
  }
  const rel = relative(realRoot, realTarget);
  if (rel === "" || rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return null;
  return realTarget;
}
