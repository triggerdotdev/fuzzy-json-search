import { hash } from "./hash";
import { IItemAccessor, scoreFuzzy } from "./scoring";
import * as strings from "./strings";

export type Match = {
  start: number;
  end: number;
};

export type ItemScore = {
  /**
   * Overall score.
   */
  score: number;

  label?: string;
  /**
   * Matches within the label.
   */
  labelMatch?: Match[];

  description?: string;
  descriptionMatch?: Match[];

  rawValue?: string;
  /**
   * Matches within the rawValue.
   * Only available if the item has a rawValue.
   *
   * @see JsonItem.rawValue
   */
  rawValueMatch?: Match[];

  formattedValue?: string;
  /**
   * Matches within the formattedValue.
   * Only available if the item has a formattedValue.
   *
   * @see JsonItem.formattedValue
   */
  formattedValueMatch?: Match[];
};

export type PreparedQueryPiece = {
  /**
   * The original query as provided as input.
   */
  original: string;
  originalLowercase: string;

  /**
   * Normalizes paths and removes wildcards
   * from the query.
   *
   * So if the query is `"foo/bar"`, the normalized
   * query is `foo.bar`.
   */
  pathNormalized: string;

  /**
   * In addition to the normalized path, will have
   * whitespace and wildcards removed.
   */
  normalized: string;
  normalizedLowercase: string;

  /**
   * The query is wrapped in quotes which means
   * this query must be a substring of the input.
   * In other words, no fuzzy matching is used.
   */
  expectContiguousMatch: boolean;
};

export type PreparedQuery = PreparedQueryPiece & {
  /**
   * Query split by spaces into pieces.
   */
  values: PreparedQueryPiece[] | undefined;

  /**
   * Whether the query contains path separator(s) or not.
   */
  containsPathSeparator: boolean;
};

export { FuzzyScore, IItemAccessor, scoreFuzzy } from "./scoring";

const MULTIPLE_QUERY_VALUES_SEPARATOR = " ";
export function prepareQuery(original: string): PreparedQuery {
  if (typeof original !== "string") {
    original = "";
  }

  const originalLowercase = original.toLowerCase();
  const { pathNormalized, normalized, normalizedLowercase } = normalizeQuery(original);
  const containsPathSeparator = pathNormalized.indexOf(".") >= 0;
  const expectExactMatch = queryExpectsExactMatch(original);

  let values: PreparedQueryPiece[] | undefined = undefined;

  const originalSplit = original.split(MULTIPLE_QUERY_VALUES_SEPARATOR);
  if (originalSplit.length > 1) {
    for (const originalPiece of originalSplit) {
      const expectExactMatchPiece = queryExpectsExactMatch(originalPiece);
      const {
        pathNormalized: pathNormalizedPiece,
        normalized: normalizedPiece,
        normalizedLowercase: normalizedLowercasePiece,
      } = normalizeQuery(originalPiece);

      if (normalizedPiece) {
        if (!values) {
          values = [];
        }

        values.push({
          original: originalPiece,
          originalLowercase: originalPiece.toLowerCase(),
          pathNormalized: pathNormalizedPiece,
          normalized: normalizedPiece,
          normalizedLowercase: normalizedLowercasePiece,
          expectContiguousMatch: expectExactMatchPiece,
        });
      }
    }
  }

  return {
    original,
    originalLowercase,
    pathNormalized,
    normalized,
    normalizedLowercase,
    values,
    containsPathSeparator,
    expectContiguousMatch: expectExactMatch,
  };
}

function normalizeQuery(original: string): {
  pathNormalized: string;
  normalized: string;
  normalizedLowercase: string;
} {
  const pathNormalized = original.replace(/\//g, "."); // Help Windows users to search for paths when using slash

  // we remove quotes here because quotes are used for exact match search
  const normalized = stripWildcards(pathNormalized).replace(/\s|"/g, "");

  return {
    pathNormalized,
    normalized,
    normalizedLowercase: normalized.toLowerCase(),
  };
}

export function stripWildcards(pattern: string): string {
  return pattern.replace(/\*/g, "");
}

function queryExpectsExactMatch(query: string) {
  return query.startsWith('"') && query.endsWith('"');
}

const NO_ITEM_SCORE = Object.freeze<ItemScore>({ score: 0 });

export function scoreItemFuzzy<T>(
  item: T,
  query: PreparedQuery,
  allowNonContiguousMatches: boolean,
  accessor: IItemAccessor<T>,
  cache = new Map<number, ItemScore>(),
): ItemScore {
  if (!item || !query.normalized) {
    return NO_ITEM_SCORE; // we need an item and query to score on at least
  }

  const label = accessor.getItemLabel(item);
  if (!label) {
    return NO_ITEM_SCORE; // we need a label at least
  }

  const description = accessor.getItemDescription(item);

  const path = accessor.getItemPath(item);

  const rawValue = accessor.getRawValue(item);

  const formattedValue = accessor.getFormattedValue(item);

  const cacheHash = getCacheHash(
    label,
    description,
    path,
    rawValue,
    formattedValue,
    allowNonContiguousMatches,
    query,
  );
  const cached = cache.get(cacheHash);
  if (cached) {
    return cached;
  }

  const itemScore = doScoreItemFuzzy(
    label,
    description,
    path,
    rawValue,
    formattedValue,
    query,
    allowNonContiguousMatches,
  );

  cache.set(cacheHash, itemScore);

  return itemScore;
}

const PATH_IDENTITY_SCORE = 1 << 18;
const LABEL_PREFIX_SCORE_THRESHOLD = 1 << 17;
const LABEL_SCORE_THRESHOLD = 1 << 16;

function doScoreItemFuzzy(
  label: string,
  description: string | undefined,
  path: string | undefined,
  rawValue: string | undefined,
  formattedValue: string | undefined,
  query: PreparedQuery,
  allowNonContiguousMatches: boolean,
): ItemScore {
  const preferLabelMatches = !path || !query.containsPathSeparator;

  // Treat identity matches on full path highest
  if (path && query.pathNormalized === path) {
    return {
      score: PATH_IDENTITY_SCORE,
      labelMatch: [{ start: 0, end: label.length }],
      descriptionMatch: description ? [{ start: 0, end: description.length }] : undefined,
      label,
      description,
      rawValue,
      formattedValue,
    };
  }

  // Score: multiple inputs
  if (query.values && query.values.length > 1) {
    return doScoreItemFuzzyMultiple(
      label,
      description,
      path,
      rawValue,
      formattedValue,
      query.values,
      preferLabelMatches,
      allowNonContiguousMatches,
    );
  }

  // Score: single input
  return doScoreItemFuzzySingle(
    label,
    description,
    path,
    rawValue,
    formattedValue,
    query,
    preferLabelMatches,
    allowNonContiguousMatches,
  );
}

function doScoreItemFuzzyMultiple(
  label: string,
  description: string | undefined,
  path: string | undefined,
  rawValue: string | undefined,
  formattedValue: string | undefined,
  query: PreparedQueryPiece[],
  preferLabelMatches: boolean,
  allowNonContiguousMatches: boolean,
): ItemScore {
  let totalScore = 0;
  const totalLabelMatches: Match[] = [];
  const totalDescriptionMatches: Match[] = [];
  const totalRawValueMatches: Match[] = [];
  const totalFormattedValueMatches: Match[] = [];

  for (const queryPiece of query) {
    const { score, labelMatch, descriptionMatch, rawValueMatch, formattedValueMatch } =
      doScoreItemFuzzySingle(
        label,
        description,
        path,
        rawValue,
        formattedValue,
        queryPiece,
        preferLabelMatches,
        allowNonContiguousMatches,
      );
    if (score === 0) {
      // if a single query value does not match, return with
      // no score entirely, we require all queries to match
      return NO_ITEM_SCORE;
    }

    totalScore += score;
    if (labelMatch) {
      totalLabelMatches.push(...labelMatch);
    }

    if (descriptionMatch) {
      totalDescriptionMatches.push(...descriptionMatch);
    }

    if (rawValueMatch) {
      totalRawValueMatches.push(...rawValueMatch);
    }

    if (formattedValueMatch) {
      totalFormattedValueMatches.push(...formattedValueMatch);
    }
  }

  // if we have a score, ensure that the positions are
  // sorted in ascending order and distinct
  return {
    score: totalScore,
    labelMatch: totalLabelMatches.length > 0 ? normalizeMatches(totalLabelMatches) : undefined,
    descriptionMatch:
      totalDescriptionMatches.length > 0 ? normalizeMatches(totalDescriptionMatches) : undefined,
    rawValueMatch:
      totalRawValueMatches.length > 0 ? normalizeMatches(totalRawValueMatches) : undefined,
    formattedValueMatch:
      totalFormattedValueMatches.length > 0
        ? normalizeMatches(totalFormattedValueMatches)
        : undefined,
    label,
    description,
    rawValue,
    formattedValue,
  };
}

function doScoreItemFuzzySingle(
  label: string,
  description: string | undefined,
  path: string | undefined,
  rawValue: string | undefined,
  formattedValue: string | undefined,
  query: PreparedQueryPiece,
  preferLabelMatches: boolean,
  allowNonContiguousMatches: boolean,
): ItemScore {
  // Prefer label matches if told so or we have no description
  if (preferLabelMatches || !description) {
    const [labelScore, labelPositions] = scoreFuzzy(
      label,
      query.normalized,
      query.normalizedLowercase,
      allowNonContiguousMatches && !query.expectContiguousMatch,
    );
    if (labelScore) {
      // If we have a prefix match on the label, we give a much
      // higher baseScore to elevate these matches over others
      // This ensures that typing a file name wins over results
      // that are present somewhere in the label, but not the
      // beginning.
      const labelPrefixMatch = matchesPrefix(true, query.normalized, label);
      let baseScore: number;
      if (labelPrefixMatch) {
        baseScore = LABEL_PREFIX_SCORE_THRESHOLD;

        // We give another boost to labels that are short, e.g. given
        // files "window.ts" and "windowActions.ts" and a query of
        // "window", we want "window.ts" to receive a higher score.
        // As such we compute the percentage the query has within the
        // label and add that to the baseScore.
        const prefixLengthBoost = Math.round((query.normalized.length / label.length) * 100);
        baseScore += prefixLengthBoost;
      } else {
        baseScore = LABEL_SCORE_THRESHOLD;
      }

      return integrateValueScores(
        {
          score: baseScore + labelScore,
          labelMatch: labelPrefixMatch || createMatches(labelPositions),
          label,
          description,
          rawValue,
          formattedValue,
        },
        rawValue,
        formattedValue,
        query,
        allowNonContiguousMatches,
      );
    }
  }

  // Finally compute description + label scores if we have a description
  if (description) {
    let descriptionPrefix = description;

    if (path) {
      descriptionPrefix = `${description}.`; // assume this is a file path
    }

    const descriptionPrefixLength = descriptionPrefix.length;
    const descriptionAndLabel = `${descriptionPrefix}${label}`;

    const [labelDescriptionScore, labelDescriptionPositions] = scoreFuzzy(
      descriptionAndLabel,
      query.normalized,
      query.normalizedLowercase,
      allowNonContiguousMatches && !query.expectContiguousMatch,
    );
    if (labelDescriptionScore) {
      const labelDescriptionMatches = createMatches(labelDescriptionPositions);
      const labelMatch: Match[] = [];
      const descriptionMatch: Match[] = [];

      // We have to split the matches back onto the label and description portions
      labelDescriptionMatches.forEach((h) => {
        // Match overlaps label and description part, we need to split it up
        if (h.start < descriptionPrefixLength && h.end > descriptionPrefixLength) {
          labelMatch.push({ start: 0, end: h.end - descriptionPrefixLength });
          descriptionMatch.push({ start: h.start, end: descriptionPrefixLength });
        }

        // Match on label part
        else if (h.start >= descriptionPrefixLength) {
          labelMatch.push({
            start: h.start - descriptionPrefixLength,
            end: h.end - descriptionPrefixLength,
          });
        }

        // Match on description part
        else {
          descriptionMatch.push(h);
        }
      });

      return integrateValueScores(
        {
          score: labelDescriptionScore,
          labelMatch,
          descriptionMatch,
          label,
          description,
          rawValue,
          formattedValue,
        },
        rawValue,
        formattedValue,
        query,
        allowNonContiguousMatches,
      );
    }
  }

  return integrateValueScores(
    {
      score: 0,
      label,
      description,
      rawValue,
      formattedValue,
    },
    rawValue,
    formattedValue,
    query,
    allowNonContiguousMatches,
  );
}

export function compareItemsByFuzzyScore<T>(
  itemA: T,
  itemB: T,
  query: PreparedQuery,
  allowNonContiguousMatches: boolean,
  accessor: IItemAccessor<T>,
  cache = new Map<number, ItemScore>(),
): number {
  const itemScoreA = scoreItemFuzzy(itemA, query, allowNonContiguousMatches, accessor, cache);
  const itemScoreB = scoreItemFuzzy(itemB, query, allowNonContiguousMatches, accessor, cache);

  const scoreA = itemScoreA.score;
  const scoreB = itemScoreB.score;

  // 1.) identity matches have highest score
  if (scoreA === PATH_IDENTITY_SCORE || scoreB === PATH_IDENTITY_SCORE) {
    if (scoreA !== scoreB) {
      return scoreA === PATH_IDENTITY_SCORE ? -1 : 1;
    }
  }

  // 2.) matches on label are considered higher compared to label+description matches
  if (scoreA > LABEL_SCORE_THRESHOLD || scoreB > LABEL_SCORE_THRESHOLD) {
    if (scoreA !== scoreB) {
      return scoreA > scoreB ? -1 : 1;
    }

    // prefer more compact matches over longer in label (unless this is a prefix match where
    // longer prefix matches are actually preferred)
    if (scoreA < LABEL_PREFIX_SCORE_THRESHOLD && scoreB < LABEL_PREFIX_SCORE_THRESHOLD) {
      const comparedByMatchLength = compareByMatchLength(
        itemScoreA.labelMatch,
        itemScoreB.labelMatch,
      );
      if (comparedByMatchLength !== 0) {
        return comparedByMatchLength;
      }
    }

    // prefer shorter labels over longer labels
    const labelA = accessor.getItemLabel(itemA) || "";
    const labelB = accessor.getItemLabel(itemB) || "";
    if (labelA.length !== labelB.length) {
      return labelA.length - labelB.length;
    }
  }

  // 3.) compare by score
  if (scoreA !== scoreB) {
    return scoreA > scoreB ? -1 : 1;
  }

  const itemAIsArrayItem = accessor.getIsArrayItem(itemA);
  const itemBIsArrayItem = accessor.getIsArrayItem(itemB);

  // 4.) prefer non array items over array items
  if (itemAIsArrayItem !== itemBIsArrayItem) {
    return itemBIsArrayItem ? -1 : 1;
  }

  return fallbackCompare(itemA, itemB, query, accessor);
}

function compareByMatchLength(matchesA?: Match[], matchesB?: Match[]): number {
  if (
    (!matchesA && !matchesB) ||
    ((!matchesA || !matchesA.length) && (!matchesB || !matchesB.length))
  ) {
    return 0; // make sure to not cause bad comparing when matches are not provided
  }

  if (!matchesB || !matchesB.length) {
    return -1;
  }

  if (!matchesA || !matchesA.length) {
    return 1;
  }

  // Compute match length of A (first to last match)
  const matchStartA = matchesA[0].start;
  const matchEndA = matchesA[matchesA.length - 1].end;
  const matchLengthA = matchEndA - matchStartA;

  // Compute match length of B (first to last match)
  const matchStartB = matchesB[0].start;
  const matchEndB = matchesB[matchesB.length - 1].end;
  const matchLengthB = matchEndB - matchStartB;

  // Prefer shorter match length
  return matchLengthA === matchLengthB ? 0 : matchLengthB < matchLengthA ? 1 : -1;
}

function fallbackCompare<T>(
  itemA: T,
  itemB: T,
  query: PreparedQuery,
  accessor: IItemAccessor<T>,
): number {
  // check for label + description length and prefer shorter
  const labelA = accessor.getItemLabel(itemA) || "";
  const labelB = accessor.getItemLabel(itemB) || "";

  const descriptionA = accessor.getItemDescription(itemA);
  const descriptionB = accessor.getItemDescription(itemB);

  const labelDescriptionALength = labelA.length + (descriptionA ? descriptionA.length : 0);
  const labelDescriptionBLength = labelB.length + (descriptionB ? descriptionB.length : 0);

  if (labelDescriptionALength !== labelDescriptionBLength) {
    return labelDescriptionALength - labelDescriptionBLength;
  }

  // check for path length and prefer shorter
  const pathA = accessor.getItemPath(itemA);
  const pathB = accessor.getItemPath(itemB);

  if (pathA && pathB && pathA.length !== pathB.length) {
    return pathA.length - pathB.length;
  }

  // 7.) finally we have equal scores and equal length, we fallback to comparer

  // compare by label
  if (labelA !== labelB) {
    return compareAnything(labelA, labelB, query.normalized);
  }

  // compare by description
  if (descriptionA && descriptionB && descriptionA !== descriptionB) {
    return compareAnything(descriptionA, descriptionB, query.normalized);
  }

  // compare by path
  if (pathA && pathB && pathA !== pathB) {
    return compareAnything(pathA, pathB, query.normalized);
  }

  // equal
  return 0;
}

export function compareAnything(one: string, other: string, lookFor: string): number {
  const elementAName = one.toLowerCase();
  const elementBName = other.toLowerCase();

  // Sort prefix matches over non prefix matches
  const prefixCompare = compareByPrefix(one, other, lookFor);
  if (prefixCompare) {
    return prefixCompare;
  }

  // Sort suffix matches over non suffix matches
  const elementASuffixMatch = elementAName.endsWith(lookFor);
  const elementBSuffixMatch = elementBName.endsWith(lookFor);
  if (elementASuffixMatch !== elementBSuffixMatch) {
    return elementASuffixMatch ? -1 : 1;
  }

  // Compare by name
  return elementAName.localeCompare(elementBName);
}

export function compareByPrefix(one: string, other: string, lookFor: string): number {
  const elementAName = one.toLowerCase();
  const elementBName = other.toLowerCase();

  // Sort prefix matches over non prefix matches
  const elementAPrefixMatch = elementAName.startsWith(lookFor);
  const elementBPrefixMatch = elementBName.startsWith(lookFor);
  if (elementAPrefixMatch !== elementBPrefixMatch) {
    return elementAPrefixMatch ? -1 : 1;
  }

  // Same prefix: Sort shorter matches to the top to have those on top that match more precisely
  else if (elementAPrefixMatch && elementBPrefixMatch) {
    if (elementAName.length < elementBName.length) {
      return -1;
    }

    if (elementAName.length > elementBName.length) {
      return 1;
    }
  }

  return 0;
}

function integrateValueScores(
  score: ItemScore,
  rawValue: string | undefined,
  formattedValue: string | undefined,
  query: PreparedQueryPiece,
  allowNonContiguousMatches: boolean,
): ItemScore {
  const result: ItemScore = {
    ...score,
  };

  if (rawValue) {
    const [rawValueScore, rawValuePositions] = scoreFuzzy(
      rawValue,
      query.normalized,
      query.normalizedLowercase,
      allowNonContiguousMatches && !query.expectContiguousMatch,
      false,
    );

    if (rawValueScore) {
      const rawValueMatch = createMatches(rawValuePositions);

      result.score = result.score + rawValueScore;
      result.rawValueMatch = rawValueMatch;
    }
  }

  if (formattedValue && rawValue !== formattedValue) {
    const [formattedValueScore, formattedValuePositions] = scoreFuzzy(
      formattedValue,
      query.normalized,
      query.normalizedLowercase,
      allowNonContiguousMatches && !query.expectContiguousMatch,
      false,
    );

    if (formattedValueScore) {
      const formattedValueMatch = createMatches(formattedValuePositions);

      result.score = result.score + formattedValueScore;
      result.formattedValueMatch = formattedValueMatch;
    }
  }

  return result;
}

function createMatches(offsets: number[] | undefined): Match[] {
  const ret: Match[] = [];
  if (!offsets) {
    return ret;
  }

  let last: Match | undefined;
  for (const pos of offsets) {
    if (last && last.end === pos) {
      last.end += 1;
    } else {
      last = { start: pos, end: pos + 1 };
      ret.push(last);
    }
  }

  return ret;
}

function matchesPrefix(
  ignoreCase: boolean,
  word: string,
  wordToMatchAgainst: string,
): Match[] | null {
  if (!wordToMatchAgainst || wordToMatchAgainst.length < word.length) {
    return null;
  }

  let matches: boolean;
  if (ignoreCase) {
    matches = strings.startsWithIgnoreCase(wordToMatchAgainst, word);
  } else {
    matches = wordToMatchAgainst.indexOf(word) === 0;
  }

  if (!matches) {
    return null;
  }

  return word.length > 0 ? [{ start: 0, end: word.length }] : [];
}

export function normalizeMatches(matches: Match[]): Match[] {
  // sort matches by start to be able to normalize
  const sortedMatches = matches.sort((matchA, matchB) => {
    return matchA.start - matchB.start;
  });

  // merge matches that overlap
  const normalizedMatches: Match[] = [];
  let currentMatch: Match | undefined = undefined;
  for (const match of sortedMatches) {
    // if we have no current match or the matches
    // do not overlap, we take it as is and remember
    // it for future merging
    if (!currentMatch || !matchOverlaps(currentMatch, match)) {
      currentMatch = match;
      normalizedMatches.push(match);
    }

    // otherwise we merge the matches
    else {
      currentMatch.start = Math.min(currentMatch.start, match.start);
      currentMatch.end = Math.max(currentMatch.end, match.end);
    }
  }

  return normalizedMatches;
}

function matchOverlaps(matchA: Match, matchB: Match): boolean {
  if (matchA.end < matchB.start) {
    return false; // A ends before B starts
  }

  if (matchB.end < matchA.start) {
    return false; // B ends before A starts
  }

  return true;
}

function getCacheHash(
  label: string,
  description: string | undefined,
  path: string | undefined,
  rawValue: string | undefined,
  formattedValue: string | undefined,
  allowNonContiguousMatches: boolean,
  query: PreparedQuery,
): number {
  const values = query.values ? query.values : [query];
  const cacheHash = hash({
    [query.normalized]: {
      values: values.map((v) => ({
        value: v.normalized,
        expectContiguousMatch: v.expectContiguousMatch,
      })),
      label,
      description,
      allowNonContiguousMatches,
      path,
      rawValue,
      formattedValue,
    },
  });
  return cacheHash;
}
