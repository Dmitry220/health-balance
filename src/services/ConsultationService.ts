import { API_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConsultation } from "../models/IConsultation";

export const consultationApi = createApi({
  reducerPath: "consultationApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    consultation: builder.mutation<{ suucess: boolean }, IConsultation>({
      query: (initialPost) => ({
        url: `consultation`,
        method: "POST",
        body: initialPost,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useConsultationMutation } = consultationApi;
