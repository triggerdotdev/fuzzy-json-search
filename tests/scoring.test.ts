import {
  prepareQuery,
  FuzzyScore,
  scoreFuzzy,
  ItemScore,
  scoreItemFuzzy,
  IItemAccessor,
  compareItemsByFuzzyScore,
} from "../src/fuzzyScoring";

import { JsonHeroPathAccessor } from "./utils/jsonHeroAccessor";

function scoreItem<T>(
  item: T,
  query: string,
  allowNonContiguousMatches: boolean,
  accessor: IItemAccessor<T>,
  cache = new Map<number, ItemScore>(),
): ItemScore {
  return scoreItemFuzzy(item, prepareQuery(query), allowNonContiguousMatches, accessor, cache);
}

function compareItemsByScore<T>(
  itemA: T,
  itemB: T,
  query: string,
  allowNonContiguousMatches: boolean,
  accessor: IItemAccessor<T>,
): number {
  return compareItemsByFuzzyScore(
    itemA,
    itemB,
    prepareQuery(query),
    allowNonContiguousMatches,
    accessor,
    new Map<number, ItemScore>(),
  );
}

function _doScore(target: string, query: string, allowNonContiguousMatches?: boolean): FuzzyScore {
  const preparedQuery = prepareQuery(query);

  return scoreFuzzy(
    target,
    preparedQuery.normalized,
    preparedQuery.normalizedLowercase,
    allowNonContiguousMatches ?? !preparedQuery.expectContiguousMatch,
  );
}

const jsonHeroPathAccessor = new JsonHeroPathAccessor({
  xyz: {
    some: {
      path: {
        someKey123: "2022-01-01T00:00:00.000Z",
        aKey456: "zyx.others.spath.some.xsp.file123",
      },
    },
  },
});

test("JsonHeroPathAccessor", () => {
  const jsonPath = "$.xyz.some.path.someKey123";

  expect(jsonHeroPathAccessor.getItemLabel(jsonPath)).toBe("someKey123");
  expect(jsonHeroPathAccessor.getItemDescription(jsonPath)).toBe("xyz.some.path");
  expect(jsonHeroPathAccessor.getItemPath(jsonPath)).toBe("xyz.some.path.someKey123");
  expect(jsonHeroPathAccessor.getRawValue(jsonPath)).toBe("2022-01-01T00:00:00.000Z");
  expect(jsonHeroPathAccessor.getFormattedValue(jsonPath)).toBe(
    "Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)",
  );
});

test("scoreItem", () => {
  const jsonPath = "$.xyz.some.path.someKey123";

  const pathIdentity = scoreItem(
    jsonPath,
    jsonHeroPathAccessor.getItemPath(jsonPath),
    true,
    jsonHeroPathAccessor,
  );

  expect(pathIdentity.score).toBeGreaterThan(0);
  expect(pathIdentity.labelMatch?.length).toBe(1);
  expect(pathIdentity.labelMatch?.[0].start).toBe(0);
  expect(pathIdentity.labelMatch?.[0].end).toBe(jsonHeroPathAccessor.getItemLabel(jsonPath).length);
  expect(pathIdentity.descriptionMatch?.length).toBe(1);
  expect(pathIdentity.descriptionMatch?.[0].start).toBe(0);
  expect(pathIdentity.descriptionMatch?.[0].end).toBe(
    jsonHeroPathAccessor.getItemDescription(jsonPath).length,
  );
  expect(pathIdentity.rawValueMatch).toBeUndefined();
  expect(pathIdentity.formattedValueMatch).toBeUndefined();
  expect(pathIdentity.label).toBe("someKey123");
  expect(pathIdentity.description).toBe("xyz.some.path");
  expect(pathIdentity.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(pathIdentity.formattedValue).toBe(
    "Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)",
  );

  const labelPrefix = scoreItem(jsonPath, "som", true, jsonHeroPathAccessor);
  expect(labelPrefix.score).toBeGreaterThan(0);
  expect(labelPrefix.descriptionMatch).toBeUndefined();
  expect(labelPrefix.rawValueMatch).toBeUndefined();
  expect(labelPrefix.formattedValueMatch).toBeUndefined();
  expect(labelPrefix.labelMatch?.length).toBe(1);
  expect(labelPrefix.labelMatch?.[0].start).toBe(0);
  expect(labelPrefix.labelMatch?.[0].end).toBe("som".length);
  expect(labelPrefix.label).toBe("someKey123");
  expect(labelPrefix.description).toBe("xyz.some.path");
  expect(labelPrefix.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(labelPrefix.formattedValue).toBe(
    "Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)",
  );

  const labelCamelcase = scoreItem(jsonPath, "sK", true, jsonHeroPathAccessor);
  expect(labelCamelcase.score).toBeGreaterThan(0);
  expect(labelCamelcase.descriptionMatch).toBeUndefined();
  expect(labelCamelcase.rawValueMatch).toBeUndefined();
  expect(labelCamelcase.formattedValueMatch).toBeUndefined();
  expect(labelCamelcase.labelMatch?.length).toBe(2);
  expect(labelCamelcase.labelMatch?.[0].start).toBe(0);
  expect(labelCamelcase.labelMatch?.[0].end).toBe(1);
  expect(labelCamelcase.labelMatch?.[1].start).toBe(4);
  expect(labelCamelcase.labelMatch?.[1].end).toBe(5);
  expect(labelCamelcase.label).toBe("someKey123");
  expect(labelCamelcase.description).toBe("xyz.some.path");
  expect(labelCamelcase.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(labelCamelcase.formattedValue).toBe(
    "Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)",
  );

  const labelMatch = scoreItem(jsonPath, "ok", true, jsonHeroPathAccessor);
  expect(labelMatch.score).toBeGreaterThan(0);
  expect(labelMatch.descriptionMatch).toBeUndefined();
  expect(labelMatch.rawValueMatch).toBeUndefined();
  expect(labelMatch.formattedValueMatch).toBeUndefined();
  expect(labelMatch.labelMatch?.length).toBe(2);
  expect(labelMatch.labelMatch?.[0].start).toBe(1);
  expect(labelMatch.labelMatch?.[0].end).toBe(2);
  expect(labelMatch.labelMatch?.[1].start).toBe(4);
  expect(labelMatch.labelMatch?.[1].end).toBe(5);
  expect(labelMatch.label).toBe("someKey123");
  expect(labelMatch.description).toBe("xyz.some.path");
  expect(labelMatch.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(labelMatch.formattedValue).toBe("Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)");

  const pathMatch = scoreItem(jsonPath, "xyz123", true, jsonHeroPathAccessor);
  expect(pathMatch.score).toBeGreaterThan(0);
  expect(pathMatch.descriptionMatch).toBeDefined();
  expect(pathMatch.rawValueMatch).toBeUndefined();
  expect(pathMatch.formattedValueMatch).toBeUndefined();
  expect(pathMatch.labelMatch).toBeDefined();
  expect(pathMatch.labelMatch?.length).toBe(1);
  expect(pathMatch.labelMatch?.[0].start).toBe(7);
  expect(pathMatch.labelMatch?.[0].end).toBe(10);
  expect(pathMatch.label).toBe("someKey123");
  expect(pathMatch.description).toBe("xyz.some.path");
  expect(pathMatch.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(pathMatch.formattedValue).toBe("Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)");

  const rawValueMatch = scoreItem(jsonPath, "-", true, jsonHeroPathAccessor);
  expect(rawValueMatch.score).toBeGreaterThan(0);
  expect(rawValueMatch.labelMatch).toBeUndefined();
  expect(rawValueMatch.descriptionMatch).toBeUndefined();
  expect(rawValueMatch.formattedValueMatch).toBeUndefined();
  expect(rawValueMatch.rawValueMatch).toBeDefined();
  expect(rawValueMatch.rawValueMatch?.length).toBe(1);
  expect(rawValueMatch.rawValueMatch?.[0].start).toBe(7);
  expect(rawValueMatch.rawValueMatch?.[0].end).toBe(8);
  expect(rawValueMatch.label).toBe("someKey123");
  expect(rawValueMatch.description).toBe("xyz.some.path");
  expect(rawValueMatch.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(rawValueMatch.formattedValue).toBe(
    "Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)",
  );

  const formattedValueMatch = scoreItem(jsonPath, "wich", true, jsonHeroPathAccessor);
  expect(formattedValueMatch.score).toBeGreaterThan(0);
  expect(formattedValueMatch.labelMatch).toBeUndefined();
  expect(formattedValueMatch.descriptionMatch).toBeUndefined();
  expect(formattedValueMatch.rawValueMatch).toBeUndefined();
  expect(formattedValueMatch.formattedValueMatch).toBeDefined();
  expect(formattedValueMatch.formattedValueMatch?.length).toBe(1);
  expect(formattedValueMatch.formattedValueMatch?.[0].start).toBe(40);
  expect(formattedValueMatch.formattedValueMatch?.[0].end).toBe(44);
  expect(formattedValueMatch.label).toBe("someKey123");
  expect(formattedValueMatch.description).toBe("xyz.some.path");
  expect(formattedValueMatch.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(formattedValueMatch.formattedValue).toBe(
    "Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)",
  );

  const valueMatch = scoreItem(jsonPath, "2022", true, jsonHeroPathAccessor);
  expect(valueMatch.score).toBeGreaterThan(0);
  expect(valueMatch.labelMatch).toBeUndefined();
  expect(valueMatch.descriptionMatch).toBeUndefined();
  expect(valueMatch.rawValueMatch).toBeDefined();
  expect(valueMatch.formattedValueMatch).toBeDefined();
  expect(valueMatch.rawValueMatch?.length).toBe(1);
  expect(valueMatch.rawValueMatch?.[0].start).toBe(0);
  expect(valueMatch.rawValueMatch?.[0].end).toBe(4);
  expect(valueMatch.formattedValueMatch?.length).toBe(1);
  expect(valueMatch.formattedValueMatch?.[0].start).toBe(11);
  expect(valueMatch.formattedValueMatch?.[0].end).toBe(15);
  expect(valueMatch.label).toBe("someKey123");
  expect(valueMatch.description).toBe("xyz.some.path");
  expect(valueMatch.rawValue).toBe("2022-01-01T00:00:00.000Z");
  expect(valueMatch.formattedValue).toBe("Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)");

  // No Match
  const noMatch = scoreItem(jsonPath, "987", true, jsonHeroPathAccessor);
  expect(noMatch.score).toBe(0);
  expect(noMatch.labelMatch).toBeUndefined();
  expect(noMatch.descriptionMatch).toBeUndefined();
  expect(noMatch.rawValueMatch).toBeUndefined();
  expect(noMatch.formattedValueMatch).toBeUndefined();

  // No Exact Match
  const noExactMatch = scoreItem(jsonPath, '"sK"', true, jsonHeroPathAccessor);
  expect(noExactMatch.score).toBe(0);
  expect(noExactMatch.labelMatch).toBeUndefined();
  expect(noExactMatch.descriptionMatch).toBeUndefined();
  expect(noExactMatch.rawValueMatch).toBeUndefined();
  expect(noExactMatch.formattedValueMatch).toBeUndefined();

  expect(pathIdentity.score).toBeGreaterThan(labelPrefix.score);
  expect(labelPrefix.score).toBeGreaterThan(labelCamelcase.score);
  expect(labelCamelcase.score).toBeGreaterThan(labelMatch.score);
  expect(labelMatch.score).toBeGreaterThan(pathMatch.score);
  expect(pathMatch.score).toBeGreaterThan(rawValueMatch.score);
  expect(pathMatch.score).toBeGreaterThan(formattedValueMatch.score);
});

test("scoreItem (multiple)", () => {
  const jsonPath = "$.xyz.some.path.someKey123";

  const res1 = scoreItem(jsonPath, "xyz some", true, jsonHeroPathAccessor);
  expect(res1.score).toBeGreaterThan(0);
  expect(res1.labelMatch?.length).toBe(1);
  expect(res1.labelMatch?.[0].start).toBe(0);
  expect(res1.labelMatch?.[0].end).toBe(4);
  expect(res1.descriptionMatch).toBeDefined();
  expect(res1.descriptionMatch?.length).toBe(1);
  expect(res1.descriptionMatch?.[0].start).toBe(0);
  expect(res1.descriptionMatch?.[0].end).toBe(3);
  expect(res1.rawValueMatch).toBeUndefined();
  expect(res1.formattedValueMatch).toBeUndefined();

  const res2 = scoreItem(jsonPath, "some xyz", true, jsonHeroPathAccessor);
  expect(res2.score).toStrictEqual(res1.score);
  expect(res2.score).toBeGreaterThan(0);
  expect(res2.labelMatch?.length).toBe(1);
  expect(res2.labelMatch?.[0].start).toBe(0);
  expect(res2.labelMatch?.[0].end).toBe(4);
  expect(res2.descriptionMatch).toBeDefined();
  expect(res2.descriptionMatch?.length).toBe(1);
  expect(res2.descriptionMatch?.[0].start).toBe(0);
  expect(res2.descriptionMatch?.[0].end).toBe(3);
  expect(res2.rawValueMatch).toBeUndefined();
  expect(res2.formattedValueMatch).toBeUndefined();

  const res3 = scoreItem(jsonPath, "some xyz key key123", true, jsonHeroPathAccessor);
  expect(res3.score).toBeGreaterThan(res2.score);
  expect(res3.labelMatch?.length).toBe(1);
  expect(res3.labelMatch?.[0].start).toBe(0);
  expect(res3.labelMatch?.[0].end).toBe(10);
  expect(res3.descriptionMatch?.length).toBe(1);
  expect(res3.descriptionMatch?.[0].start).toBe(0);
  expect(res3.descriptionMatch?.[0].end).toBe(3);
  expect(res3.rawValueMatch).toBeUndefined();
  expect(res3.formattedValueMatch).toBeUndefined();

  const res4 = scoreItem(jsonPath, "path z x", true, jsonHeroPathAccessor);
  expect(res4.score).toBeGreaterThan(0);
  expect(res4.score).toBeLessThan(res2.score);
  expect(res4.labelMatch).toBeUndefined();
  expect(res4.descriptionMatch?.length).toBe(3);
  expect(res4.rawValueMatch?.length).toBe(1);
});

test("scoreItem - multiple with cache yields different results", () => {
  const jsonPath = "$.xyz.some.path.someKey123";
  const cache = new Map<number, ItemScore>();
  const res1 = scoreItem(jsonPath, "xyz sm", true, jsonHeroPathAccessor, cache);
  expect(res1.score).toBeGreaterThan(0);

  // from the cache's perspective this should be a totally different query
  const res2 = scoreItem(jsonPath, 'xyz "sm"', true, jsonHeroPathAccessor, cache);
  expect(res2.score).toBe(0);

  expect(cache.size).toBe(2);
});

test("scoreItem - invalid input", function () {
  let res = scoreItem(null, null!, true, jsonHeroPathAccessor);
  expect(res.score).toBe(0);

  res = scoreItem(null, "null", true, jsonHeroPathAccessor);
  expect(res.score).toBe(0);
});

test("scoreItem - optimize for paths", function () {
  const jsonPath = "$.zyx.others.spath.some.xsp.file123";

  // xsp is more relevant to the end of the path even though it matches
  // fuzzy also in the beginning. we verify the more relevant match at the
  // end gets returned.
  const pathRes = scoreItem(jsonPath, "xspfile123", true, jsonHeroPathAccessor);
  expect(pathRes.score).toBeGreaterThan(0);
  expect(pathRes.descriptionMatch).toBeDefined();
  expect(pathRes.labelMatch).toBeDefined();
  expect(pathRes.labelMatch?.length).toStrictEqual(1);
  expect(pathRes.labelMatch?.[0].start).toStrictEqual(0);
  expect(pathRes.labelMatch?.[0].end).toStrictEqual(7);
  expect(pathRes.descriptionMatch?.length).toStrictEqual(1);
  expect(pathRes.descriptionMatch?.[0].start).toStrictEqual(22);
  expect(pathRes.descriptionMatch?.[0].end).toStrictEqual(25);
});

test("scoreItem - don't find formattedValueMatches when rawValue == formattedValue", function () {
  const jsonPath = "$.xyz.some.path.aKey456";

  const pathRes = scoreItem(jsonPath, "xspfile123", true, jsonHeroPathAccessor);
  expect(pathRes.score).toBeGreaterThan(0);
  expect(pathRes.rawValueMatch).toBeDefined();
  expect(pathRes.formattedValueMatch).toBeUndefined();
});

test("compareItemsByScore - identity", function () {
  const jsonPathA = "$.some.path.fileA";
  const jsonPathB = "$.some.path.other.fileB";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // Full resource A path
  let query = jsonHeroPathAccessor.getItemPath(jsonPathA);

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  // Full resource B path
  query = jsonHeroPathAccessor.getItemPath(jsonPathB);

  res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
  expect(res[2]).toStrictEqual(jsonPathC);
});

test("compareItemsByScore - label prefix", function () {
  const jsonPathA = "$.some.path.fileA";
  const jsonPathB = "$.some.path.other.fileB";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // json path A label
  let query = jsonHeroPathAccessor.getItemLabel(jsonPathA);

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  // Full resource B path
  query = jsonHeroPathAccessor.getItemLabel(jsonPathB);

  res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
  expect(res[2]).toStrictEqual(jsonPathC);
});

test("compareItemsByScore - path scores", function () {
  const jsonPathA = "$.some.path.fileA";
  const jsonPathB = "$.some.path.other.fileB";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // json path A part of path
  let query = "pathfileA";

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  // Full resource B path
  query = "pathfileB";

  res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
  expect(res[2]).toStrictEqual(jsonPathC);
});

test("compareItemsByScore - prefer shorter labels", function () {
  const jsonPathA = "$.some.path.fileA";
  const jsonPathB = "$.some.path.other.fileBLonger";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // json path A part of path
  const query = "somepath";

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);
});

test("compareItemsByScore - prefer non-array items", function () {
  const jsonPathA = "$.some.path.fileA.0";
  const jsonPathB = "$.some.path.other.fileB";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // json path A part of path
  const query = "path";

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathC);
  expect(res[2]).toStrictEqual(jsonPathA);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathC);
  expect(res[2]).toStrictEqual(jsonPathA);
});

test("compareItemsByScore - prefer shorter labels (match on label)", function () {
  const jsonPathA = "$.some.path.fileA";
  const jsonPathB = "$.some.path.other.fileBLonger";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // json path A part of path
  const query = "file";

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathC);
  expect(res[2]).toStrictEqual(jsonPathB);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathC);
  expect(res[2]).toStrictEqual(jsonPathB);
});

test("compareItemsByScore - prefer shorter paths", function () {
  const jsonPathA = "$.some.path.fileA";
  const jsonPathB = "$.some.path.other.fileB";
  const jsonPathC = "$.unrelated.some.path.other.fileC";

  // json path A part of path
  const query = "somepath";

  let res = [jsonPathA, jsonPathB, jsonPathC].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);

  res = [jsonPathC, jsonPathB, jsonPathA].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );
  expect(res[0]).toStrictEqual(jsonPathA);
  expect(res[1]).toStrictEqual(jsonPathB);
  expect(res[2]).toStrictEqual(jsonPathC);
});

test("compareItemsByScore - prefer matches in label over description", function () {
  const jsonPathA = "$.parts.quick.arrow-left-dark";
  const jsonPathB = "$.parts.quickopen.quickopen";

  // json path A part of path
  const query = "partsquick";

  const res = [jsonPathA, jsonPathB].sort((p1, p2) =>
    compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
  );

  expect(res[0]).toStrictEqual(jsonPathB);
  expect(res[1]).toStrictEqual(jsonPathA);
});

test("compareItemsByScore - prefer camel case matches", function () {
  const jsonPathA = "$.config.test.nullPointerException";
  const jsonPathB = "$.config.test.nopointerexception";

  for (const query of ["npe", "NPE"]) {
    const res = [jsonPathA, jsonPathB].sort((p1, p2) =>
      compareItemsByScore(p1, p2, query, true, jsonHeroPathAccessor),
    );

    expect(res[0]).toStrictEqual(jsonPathA);
    expect(res[1]).toStrictEqual(jsonPathB);
  }
});

test("score (fuzzy)", () => {
  const target = "HeLlo-World";

  const scores: FuzzyScore[] = [];
  scores.push(_doScore(target, "HelLo-World", true)); // direct case match
  scores.push(_doScore(target, "hello-world", true)); // direct mix-case match
  scores.push(_doScore(target, "HW", true)); // direct case prefix (multiple)
  scores.push(_doScore(target, "hw", true)); // direct mix-case prefix (multiple)
  scores.push(_doScore(target, "H", true)); // direct case prefix
  scores.push(_doScore(target, "h", true)); // direct mix-case prefix
  scores.push(_doScore(target, "W", true)); // direct case word prefix
  scores.push(_doScore(target, "Ld", true)); // in-string case match (multiple)
  scores.push(_doScore(target, "ld", true)); // in-string mix-case match (consecutive, avoids scattered hit)
  scores.push(_doScore(target, "w", true)); // direct mix-case word prefix
  scores.push(_doScore(target, "L", true)); // in-string case match
  scores.push(_doScore(target, "l", true)); // in-string mix-case match
  scores.push(_doScore(target, "4", true)); // no match

  // Assert scoring order
  const sortedScores = scores.concat().sort((a, b) => b[0] - a[0]);
  expect(scores).toStrictEqual(sortedScores);
});

test("score (fuzzy) - json paths", () => {
  const target = "xyx.some.path.someKey123";

  expect(_doScore(target, "xyx.some.path.someKey123", true)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "xyx", true)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "123", true)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "xyx123", true)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "xyx123", true)).toMatchInlineSnapshot(`
    Array [
      50,
      Array [
        0,
        1,
        2,
        21,
        22,
        23,
      ],
    ]
  `);
});

test("score (non fuzzy)", function () {
  const target = "HeLlo-World";

  expect(_doScore(target, "HelLo-World", false)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "HelLo-World", false)[1].length).toStrictEqual("HelLo-World".length);

  expect(_doScore(target, "hello-world", false)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "HW", false)[0]).toStrictEqual(0);
  expect(_doScore(target, "h", false)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "ello", false)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "ld", false)[0]).toBeGreaterThan(0);
  expect(_doScore(target, "HW", false)[0]).toStrictEqual(0);
  expect(_doScore(target, "eo", false)[0]).toStrictEqual(0);
});

test("prepareQuery", () => {
  expect(prepareQuery(" f*a ").normalized).toStrictEqual("fa");
  expect(prepareQuery("foo Bar").original).toStrictEqual("foo Bar");
  expect(prepareQuery("foo Bar").originalLowercase).toStrictEqual("foo Bar".toLowerCase());
  expect(prepareQuery("foo Bar").normalized).toStrictEqual("fooBar");
  expect(prepareQuery("foo Bar").expectContiguousMatch).toBe(false); // doesn't have quotes in it
  expect(prepareQuery("Foo Bar").normalizedLowercase).toStrictEqual("foobar");
  expect(prepareQuery("FooBar").containsPathSeparator).toBe(false);
  expect(prepareQuery("foo.bar").containsPathSeparator).toBe(true);
  expect(prepareQuery('"foobar"').expectContiguousMatch).toBe(true);
  expect(prepareQuery('"hello"').normalized).toStrictEqual("hello");

  // with spaces
  let query = prepareQuery("He*llo World");
  expect(query.original).toStrictEqual("He*llo World");
  expect(query.normalized).toStrictEqual("HelloWorld");
  expect(query.normalizedLowercase).toStrictEqual("HelloWorld".toLowerCase());
  expect(query.values?.length).toStrictEqual(2);
  expect(query.values?.[0].original).toStrictEqual("He*llo");
  expect(query.values?.[0].normalized).toStrictEqual("Hello");
  expect(query.values?.[0].normalizedLowercase).toStrictEqual("Hello".toLowerCase());
  expect(query.values?.[1].original).toStrictEqual("World");
  expect(query.values?.[1].normalized).toStrictEqual("World");
  expect(query.values?.[1].normalizedLowercase).toStrictEqual("World".toLowerCase());

  // with spaces that are empty
  query = prepareQuery(" Hello   World  	");
  expect(query.original).toStrictEqual(" Hello   World  	");
  expect(query.originalLowercase).toStrictEqual(" Hello   World  	".toLowerCase());
  expect(query.normalized).toStrictEqual("HelloWorld");
  expect(query.normalizedLowercase).toStrictEqual("HelloWorld".toLowerCase());
  expect(query.values?.length).toStrictEqual(2);
  expect(query.values?.[0].original).toStrictEqual("Hello");
  expect(query.values?.[0].originalLowercase).toStrictEqual("Hello".toLowerCase());
  expect(query.values?.[0].normalized).toStrictEqual("Hello");
  expect(query.values?.[0].normalizedLowercase).toStrictEqual("Hello".toLowerCase());
  expect(query.values?.[1].original).toStrictEqual("World");
  expect(query.values?.[1].originalLowercase).toStrictEqual("World".toLowerCase());
  expect(query.values?.[1].normalized).toStrictEqual("World");
  expect(query.values?.[1].normalizedLowercase).toStrictEqual("World".toLowerCase());

  expect(prepareQuery("/some/path").pathNormalized).toStrictEqual(".some.path");
  expect(prepareQuery("/some/path").normalized).toStrictEqual(".some.path");
  expect(prepareQuery("/some/path").containsPathSeparator).toStrictEqual(true);
});
