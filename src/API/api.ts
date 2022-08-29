import axios, { AxiosInstance } from "axios";

type apiInstances = Record<string, AxiosInstance>

export const instance = axios.create({
    baseURL: "http://health-balance.ru/api/",
    headers: {
        "Content-Type": "aplication/json",
        // "X-API-KEY": API_KEY,
    },
});

