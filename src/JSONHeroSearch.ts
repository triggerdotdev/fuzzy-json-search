import LRUCache from "lru-cache";
import { IItemAccessor, ItemScore, prepareQuery } from "./fuzzyScoring";
import { search, SearchResult } from "./search";

export type JSONHeroSearchFormatter = (value: unknown) => string | undefined;

export type JSONHeroSearchOptions = {
  cacheSettings?: {
    enabled?: boolean;
    max?: number;
  };
  accessor?: IItemAccessor<string>;
  formatter?: JSONHeroSearchFormatter;
};

export class JSONHeroSearch {
  json: unknown;
  items: string[];
  scoreCache: Map<number, ItemScore> = new Map();
  searchCache: LRUCache<string, Array<SearchResult<string>>>;
  options: Required<Omit<JSONHeroSearchOptions, "formatter">>;

  constructor(json: unknown, options?: JSONHeroSearchOptions) {
    this.json = json;
    this.items = [];
    this.options = {
      cacheSettings: {
        enabled: true,
        max: 100,
        ...options?.cacheSettings,
      },
      accessor: new JSONHeroSearchAccessor(this.json, options?.formatter ?? defaultFormatter),
      ...options,
    };

    this.searchCache = new LRUCache<string, Array<SearchResult<string>>>({
      max: options?.cacheSettings?.max ?? 100,
    });
  }

  prepareIndex() {
    if (this.items.length > 0) {
      return;
    }

    this.items = getAllPaths(this.json);
  }

  search(query: string): Array<SearchResult<string>> {
    if (this.options.cacheSettings.enabled && this.searchCache.has(query)) {
      return this.searchCache.get(query) ?? [];
    }

    this.prepareIndex();

    const preparedQuery = prepareQuery(query);

    const results = search(this.items, preparedQuery, true, this.options.accessor, this.scoreCache);

    if (this.options.cacheSettings.enabled) this.searchCache.set(query, results);

    return results;
  }
}

function lastComponent(path: string): string {
  const components = path.split(".");

  return components[components.length - 1];
}

function isArray(path: string): boolean {
  const last = lastComponent(path);

  return last.match(/^\d+$/) !== null;
}

export class JSONHeroSearchAccessor implements IItemAccessor<string> {
  json: unknown;
  formatter: JSONHeroSearchFormatter;
  valueCache: Map<string, string> = new Map<string, string>();

  constructor(json: unknown, formatter: JSONHeroSearchFormatter) {
    this.json = json;
    this.formatter = formatter;
  }

  getIsArrayItem(path: string): boolean {
    return isArray(path);
  }

  getItemLabel(path: string): string {
    return lastComponent(path);
  }

  getItemDescription(path: string): string {
    // Get all but the first and last component
    const components = path.split(".").slice(1, -1);

    return components.join(".");
  }

  getItemPath(path: string): string {
    // Get all but the first component
    const components = path.split(".").slice(1);

    return components.join(".");
  }

  getRawValue(path: string): string | undefined {
    const cacheKey = `${path}_raw`;

    if (this.valueCache.has(cacheKey)) {
      return this.valueCache.get(cacheKey);
    }

    const rawValue = doGetRawValue(this.json);

    if (rawValue) {
      this.valueCache.set(cacheKey, rawValue);
    }

    return rawValue;

    function doGetRawValue(json: unknown) {
      const result = getFirstAtPath(json, path);

      if (typeof result === "string") {
        return result;
      }

      if (typeof result === "boolean") {
        return result ? "true" : "false";
      }

      if (result === "null") {
        return "null";
      }

      if (typeof result === "number") {
        return result.toString();
      }
    }
  }

  getFormattedValue(path: string): string | undefined {
    const cacheKey = `${path}_formatted`;

    if (this.valueCache.has(cacheKey)) {
      return this.valueCache.get(cacheKey);
    }

    const formattedValue = doGetFormattedValue(this.json, this.formatter);

    if (formattedValue) {
      this.valueCache.set(cacheKey, formattedValue);
    }

    return formattedValue;

    function doGetFormattedValue(json: unknown, formatter: JSONHeroSearchFormatter) {
      const result = getFirstAtPath(json, path);

      return formatter(result);
    }
  }
}

function getAllPaths(json: unknown): Array<string> {
  const paths: Array<string> = [];

  function walk(json: unknown, path: string) {
    paths.push(path);

    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; i++) {
        walk(json[i], `${path}.${i}`);
      }
    } else if (typeof json === "object" && json !== null) {
      for (const key of Object.keys(json)) {
        walk(json[key as keyof typeof json], `${path}.${key}`);
      }
    }
  }

  walk(json, "$");

  return paths;
}

function getFirstAtPath(json: unknown, path: string): unknown {
  let result = json;

  const components = path.split(".");

  for (const component of components) {
    if (component === "$") {
      continue;
    }

    if (result === undefined) {
      return;
    }

    if (Array.isArray(result) && component.match(/^\d+$/)) {
      result = result[Number(component)];
    } else {
      if (typeof result === "object" && result !== null) {
        result = result[component as keyof typeof result];
      } else {
        return result;
      }
    }
  }

  return result;
}

function defaultFormatter(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "number") {
    return value.toString();
  }
}
