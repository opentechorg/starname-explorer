export interface ResultsPage<T> {
  readonly docs: readonly T[];
  readonly totalDocs: number;
  readonly limit: number;
  readonly page: number;
  readonly totalPages: number;
  readonly pagingCounter: number;
  readonly hasPrevPage: boolean;
  readonly hasNextPage: boolean;
  readonly prevPage: number | null;
  readonly nextPage: number | null;
}
