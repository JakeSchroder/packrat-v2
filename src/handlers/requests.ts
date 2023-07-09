import type { QueryParam } from "../types/requests";

export const getQueryParam = (defaultValue: any, queryParam: QueryParam) => {
  if (queryParam === undefined) {
    return defaultValue;
  }

  if (Array.isArray(queryParam)) {
    return queryParam[0];
  }

  return queryParam;
};
