import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../services/api";
import { GoalType } from "./useGoal";

export default function useGoalMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (values: GoalType) => {
      return api({
        url: "goal",
        method: "POST",
        data: values,
      });
    },
    {
      onSuccess: ({ data }: AxiosResponse) => {
        queryClient.setQueryData(["goal"], data);
      },
    }
  );
}
