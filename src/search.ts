import {
  compareItemsByFuzzyScore,
  IItemAccessor,
  ItemScore,
  PreparedQuery,
  scoreItemFuzzy,
} from "./fuzzyScoring";

export type SearchResult<T> = {
  item: T;
  score: ItemScore;
};

export function search<T>(
  items: T[],
  query: PreparedQuery,
  allowNonContiguousMatches: boolean,
  accessor: IItemAccessor<T>,
  cache = new Map<number, ItemScore>(),
): Array<SearchResult<T>> {
  const sortedItems = [...items].sort((a, b) =>
    compareItemsByFuzzyScore(a, b, query, allowNonContiguousMatches, accessor, cache),
  );

  const allResults = sortedItems.map((item) => {
    const score = scoreItemFuzzy(item, query, allowNonContiguousMatches, accessor, cache);
    return { item, score };
  });

  const allResultsWithScore = allResults.filter((result) => result.score.score > 0);

  return allResultsWithScore;
}
