import { JSONHeroPath } from "@jsonhero/path";

export function getAllPaths(json: unknown): Array<JSONHeroPath> {
  const paths: Array<JSONHeroPath> = [];

  function walk(json: unknown, path: JSONHeroPath) {
    paths.push(path);

    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; i++) {
        walk(json[i], path.child(i.toString()));
      }
    } else if (typeof json === "object" && json !== null) {
      for (const key of Object.keys(json)) {
        walk(json[key as keyof typeof json], path.child(key));
      }
    }
  }

  walk(json, new JSONHeroPath("$"));

  return paths;
}
