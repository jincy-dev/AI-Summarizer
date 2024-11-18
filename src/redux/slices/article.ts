import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { SummaryRequest, SummaryResponse } from "../../types";

// Retrieve the API key from environment variables
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleAPI",  // name of the slice
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",  // Base URL for the API
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", rapidApiKey);  // API key for authentication
      headers.set("x-rapidapi-host", "article-extractor-and-summarizer.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Define the query for fetching article summary
    getSummary: builder.query<SummaryResponse, SummaryRequest>({
      query: (params) => {
        return `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`; // Construct query string with params
      },
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi as unknown as any;
