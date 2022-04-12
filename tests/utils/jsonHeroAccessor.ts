import { inferType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { IItemAccessor } from "../../src/fuzzyScoring";
import { getAllPaths } from "./getAllPaths";

export class JsonHeroPathAccessor implements IItemAccessor<string> {
  json: unknown;

  constructor(json: unknown) {
    this.json = json;
  }

  createItems(): string[] {
    return getAllPaths(this.json).map((path) => path.toString());
  }

  getIsArrayItem(item: string): boolean {
    const path = new JSONHeroPath(item);

    return path.lastComponent!.isArray;
  }

  getItemLabel(item: string): string {
    return new JSONHeroPath(item).lastComponent!.toString();
  }

  getItemDescription(item: string): string {
    // Get all but the first and last component
    const components = new JSONHeroPath(item).components.slice(1, -1);

    return components.map((c) => c.toString()).join(".");
  }

  getItemPath(item: string): string {
    // Get all but the first component
    const components = new JSONHeroPath(item).components.slice(1);

    return components.map((c) => c.toString()).join(".");
  }

  getRawValue(item: string): string | undefined {
    const inferred = inferType(new JSONHeroPath(item).first(this.json));

    switch (inferred.name) {
      case "string":
        return inferred.value;
      case "int":
      case "float":
        return inferred.value.toString();
      case "null":
        return "null";
      case "bool":
        return inferred.value ? "true" : "false";
      default:
        return;
    }
  }

  getFormattedValue(item: string): string | undefined {
    const inferred = inferType(new JSONHeroPath(item).first(this.json));

    switch (inferred.name) {
      case "string": {
        if (!inferred.format) {
          return inferred.value;
        }

        switch (inferred.format.name) {
          case "datetime": {
            const date = new Date(inferred.value);

            return date.toString();
          }
          default: {
            return inferred.value;
          }
        }
      }
      case "int":
      case "float":
        return inferred.value.toString();
      case "null":
        return "null";
      case "bool":
        return inferred.value ? "true" : "false";
      default:
        return;
    }
  }
}
