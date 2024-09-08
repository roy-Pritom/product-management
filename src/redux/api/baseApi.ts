import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQueryF = fetchBaseQuery({
    baseUrl: "https://hotel.aotrek.net/api",
    prepareHeaders: (headers,api) => {
        const token = (api.getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryF,
    tagTypes: ["product"],
    endpoints: () => ({}),
});
