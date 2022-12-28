import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../services/api";

export type GoalType = {
  id: number;
  name: string;
  value: number;
  amount: number;
  finalDate: Date;
  isActiveGoal: boolean;
};

const getGoals = async (id?: string): Promise<GoalType> => {
  const { data } = await api.get(`goal/${id}`);
  return data;
};

export default function useGoals(query?: string): UseQueryResult<GoalType> {
  return useQuery(["goal", query], ({ queryKey: [_, query = ""] }) =>
    getGoals(query)
  );
}
