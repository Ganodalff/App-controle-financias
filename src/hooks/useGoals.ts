import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiPaginationResult } from "../../types";
import { api } from "../services/api";
import { GoalType } from "./useGoal";

const getGoals = async (
  query?: string
): Promise<ApiPaginationResult<GoalType>> => {
  const { data } = await api.get(`goal/${query}`);
  return data;
};

export default function useGoals(
  query?: string
): UseQueryResult<ApiPaginationResult<GoalType>> {
  return useQuery(["goals", query], ({ queryKey: [_, query = ""] }) =>
    getGoals(query)
  );
}
