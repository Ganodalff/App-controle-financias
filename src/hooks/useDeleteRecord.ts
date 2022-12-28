import { api } from "../services/api";

export default function useDeleteRecord(url: string, id: string | number) {
  api.delete(url + "/" + id);
}
