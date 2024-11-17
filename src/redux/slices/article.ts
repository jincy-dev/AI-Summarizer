import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { SummaryRequest, SummaryResponse } from "../../types";
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// const initialState: { url: string } = {};

export const articleApi = createApi({
  reducerPath: "articleAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", rapidApiKey);
      headers.set(
        "x-rapidapi-host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query<SummaryResponse, SummaryRequest>({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
