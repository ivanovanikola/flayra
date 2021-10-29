// import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

// import { apiSlice } from '../api/apiSlice'

// const usersAdapter = createEntityAdapter()

// const initialState = usersAdapter.getInitialState()


// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => '/writers',
//       transformResponse: (res) => {
//         return usersAdapter.setAll(initialState, res)
//       },
//     }),
//   }),
// })

// export const { useGetUsersQuery } = extendedApiSlice

// // Calling `someEndpoint.select(someArg)` generates a new selector that will return
// // the query result object for a query with those parameters.
// // To generate a selector for a specific query argument, call `select(theQueryArg)`.
// // In this case, the users query has no params, so we don't pass anything to select()
// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data
// )

// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
// } = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { isToken } from "../../utils"

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:1337/auth/local/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),

        }
      )
      let data = await response.json()
      if (response.status === 200) {
        isToken(data);
        return { ...data, username: username, email: email }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

// export const loginUser = createAsyncThunk(
//   "users/login",
//   async ({ identifier, password }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         "http://localhost:1337/auth/local",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             identifier,
//             password,
//           }),
//         }
//       )
//       let data = await response.json()
//       if (response.status === 200) {
//         login(data);
//         return data
//       } else {
//         return thunkAPI.rejectWithValue(data)
//       }
//     } catch (e) {
//       console.log("Error", e.response.data)
//       thunkAPI.rejectWithValue(e.response.data)
//     }
//   }
// )
export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    console.log('input token ', token)
    try {
      const response = await fetch(
        'http://localhost:1337/users',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    // errorMessage = ''
   
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.id = payload.user.id;
      state.username = payload.user.username;
      state.email = payload.user.email;
     
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      // state.errorMessage = payload.user.message;
    },
    // [loginUser.fulfilled]: (state, { payload }) => {
    //   state.id = payload.user.id;
    //   state.username = payload.user.username;
    //   state.email = payload.user.email;
    //   state.isFetching = false;
    //   state.isSuccess = true;
    //   return state;
    // },
    // [loginUser.rejected]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.isError = true;
    //   // state.errorMessage = payload.user.message;
    // },
    // [loginUser.pending]: (state) => {
    //   state.isFetching = true;
    // },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      
    },
    [fetchUserBytoken.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export default userSlice.reducer;


export const { clearState } = userSlice.actions;
export const userSelector = state => state.user


