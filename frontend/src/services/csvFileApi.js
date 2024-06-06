import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const csvFileApi = createApi({
  reducerPath: 'csvFileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
    saveCSV: builder.mutation({
      query: (csv) => {
        return {
          url: 'csv_file/',
          method: 'POST',
          body: csv
        }
      }
    }),
    getCSV: builder.query({
      query: () => {
        return {
          url: 'list/',
          method: 'GET'
        }
      }
    })
  }),
})

export const { useSaveCSVMutation, useGetCSVQuery } = csvFileApi