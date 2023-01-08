import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiPaginationResult } from "../../types";
import { api } from "../services/api";
import { BalanceType } from "./useBalance";

const getBalances = async (
  query?: string
): Promise<ApiPaginationResult<BalanceType>> => {
  const { data } = await api.get(`balance/${query}`);
  return data;
};

export default function useBalances(
  query?: string
): UseQueryResult<ApiPaginationResult<BalanceType>> {
  return useQuery(["goals", query], ({ queryKey: [_, query = ""] }) =>
    getBalances(query)
  );
}
