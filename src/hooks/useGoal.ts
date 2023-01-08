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

const getGoal = async (id?: string): Promise<GoalType> => {
  const { data } = await api.get(`goal/${id}`);
  return data;
};

export default function useGoal(query?: string): UseQueryResult<GoalType> {
  return useQuery(["goal", query], ({ queryKey: [_, query = ""] }) =>
    getGoal(query)
  );
}
