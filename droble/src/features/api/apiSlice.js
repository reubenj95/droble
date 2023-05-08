import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/' }),
  endpoints: (builder) => ({
    getWardrobe: builder.query({
      query: () => '/clothes',
    }),
    getOutfits: builder.query({
      query: () => '/outfits',
    }),
    addToOutfit: builder.mutation({
      query: (newOutfit) => ({
        url: '/outfit_clothes',
        method: 'POST',
        body: newOutfit,
      }),
    }),
  }),
})

export const {
  useGetWardrobeQuery,
  useGetOutfitsQuery,
  useAddToOutfitMutation,
} = apiSlice
