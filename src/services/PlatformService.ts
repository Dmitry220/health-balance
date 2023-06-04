import { IPlatform } from "./../models/IPlatforms";
import { $api, API_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default class PlatformService {
  static async getPlatfotms() {
    return $api.get("platforms");
  }
  static async getPlatfotmsForChallenge() {
    return $api.get(
      `platforms?curator=1&token=${localStorage.getItem("token")}`
    );
  }
}

export const platformApi = createApi({
  reducerPath: "platformApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCurrentPlatform: builder.query<IPlatform, void>({
      query: () => `hjg`,
    }),
    getPlatfotms: builder.query<{ data: IPlatform[] }, void>({
      query: () => `platforms`,
    }),
    getPlatfotmsForChallenge: builder.query<{ data: IPlatform[] }, void>({
      query: () => `platforms?curator=1&token=${localStorage.getItem("token")}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCurrentPlatformQuery,
  useGetPlatfotmsQuery,
  useGetPlatfotmsForChallengeQuery,
} = platformApi;
