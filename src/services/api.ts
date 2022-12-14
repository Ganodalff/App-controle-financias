import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://192.168.18.2:3333",
  headers: {
    Accept: "application/json",
  },
});
