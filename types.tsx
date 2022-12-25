import { QueryClient } from "@tanstack/react-query";

export type ApiPaginationMetaResult = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
};

export type ApiPaginationResult<D = unknown> = {
  meta: ApiPaginationMetaResult;
  data: Array<D>;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});
