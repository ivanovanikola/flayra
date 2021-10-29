// // import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

// import { apiSlice } from '../api/apiSlice'

// const modsAdapter = createEntityAdapter()

// const initialState = modsAdapter.getInitialState()

// // export const extendedModsApiSlice = apiSlice.injectEndpoints({
// //   endpoints: (builder) => ({
// //     getMods: builder.query({
// //       query: () => '/mods',
// //       transformResponse: (res) => {
// //         return modsAdapter.setAll(initialState, res)
// //       },
// //     }),
// //   }),
// // })

// export const { useGetModsQuery } = extendedModsApiSlice

// // Calling `someEndpoint.select(someArg)` generates a new selector that will return
// // the query result object for a query with those parameters.
// // To generate a selector for a specific query argument, call `select(theQueryArg)`.
// // In this case, the mods query has no params, so we don't pass anything to select()
// export const selectModsResult = extendedModsApiSlice.endpoints.getMods.select()

// const selectModsData = createSelector(
//   selectModsResult,
//   (modsResult) => modsResult.data
// )

// export const {
//   selectAll: selectAllMods,
//   selectById: selectModById,
// } = modsAdapter.getSelectors((state) => selectModsData(state) ?? initialState)

