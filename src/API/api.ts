import axios, { AxiosInstance } from "axios";

type apiInstances = Record<string, AxiosInstance>

export const instance = axios.create({
  //  withCredentials: true,
    baseURL: "http://test.health-balance.ru/api/",
    headers: {
        "Content-Type": "aplication/json",
        // "X-API-KEY": API_KEY,
    },
});
