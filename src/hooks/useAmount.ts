import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../services/api";

export type AmountType = {
  cashInAmount: number;
  cashOutAmount: number;
};

const getAmount = async (id?: string): Promise<AmountType> => {
  const { data } = await api.get(`amount/${id}`);
  return data;
};

export default function useAmount(query?: string): UseQueryResult<AmountType> {
  return useQuery(["goal", query], ({ queryKey: [_, query = ""] }) =>
  getAmount(query)
  );
}
