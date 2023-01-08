import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../services/api";
import { BalanceType } from "./useBalance";

export default function useBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (values: BalanceType) => {
      return api({
        url: "balance",
        method: "POST",
        data: values,
      });
    },
    {
      onSuccess: ({ data }: AxiosResponse) => {
        queryClient.setQueryData(["balance"], data);
      },
    }
  );
}
