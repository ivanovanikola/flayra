import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../auth/authSlice'
import { checkToken } from '../auth/authProvider'





export const apiSlice = createApi({

  

  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,

    prepareHeaders: async ( headers ) => {
      const accessTokenKey = 'jwt';
      const token = await checkToken();
      if (token) {
        headers.set('authorization', `Bearer ${token[accessTokenKey]}`)
      };
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    //Posts
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id }))
      ]
    }),
    getPost: builder.query({
      query: slug => `/posts/${slug}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]
    }),
    listPosts: builder.query({
      query: list => `/posts?_start=${list}&_limit=8&_sort=updated_at:DESC`
    }),
    countPosts: builder.query({
      query: () => `/posts/count`
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['Post']
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `posts/${post.id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    mostReadPosts: builder.query({
      query: () => `/posts?_sort=views:DESC&_limit=3`
    }),

    //Reaction
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction }
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, draft => {
            const post = draft.find(post => post.id === postId)
            if (post) {
              post.reaction[reaction]++
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    //mods 
    getMods: builder.query({
      query: () => '/mods',
    }),
    getMod: builder.query({
      query: slug => `/mods/${slug}`,
    }),
    //users
    getUser: builder.query({
      query: userId => `/users/me`,
    }),
    //authors

    getAuthor: builder.query({
      query: authorId => `/authors/${authorId}`,
    }),
    //comments
    getCommentsPost: builder.query({
      query: postId => `comments?_where[post.id]=${postId}`,
    }),

    //user
    login: builder.mutation({
      query: (identifier, password) => ({
        url: 'auth/local',
        method: 'POST',
        body: 
          identifier,
          password,
        
      }),
    }),
  }),

})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
  useListPostsQuery,
  useCountPostsQuery,
  usePrefetch,
  useGetModsQuery,
  useGetModQuery,
  useGetUserQuery,
  useGetAuthorQuery,
  useGetCommentsPostQuery,
  useLoginMutation,
  useMostReadPostsQuery,


} = apiSlice