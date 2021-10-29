import { createSlice } from '@reduxjs/toolkit'



const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    username: null,
    email: null,
    role: null,
    name: null,
    surname: null,
    picture: null,
},
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.role = payload.user.role.name;
      state.name = payload.user.author.name;
      state.surname = payload.user.author.surname;
      state.picture = payload.user.author.picture;
      return state;
    },
    clearCredentials: (state) => {

      state.username = null;
      state.email = null;
      state.role = null;
      state.name = null;
      state.surname = null;
      state.picture = null;

      return state;
    },

  },

})

export default authSlice.reducer

export const { setCredentials, clearCredentials } = authSlice.actions
export const selectCurrentUser = state  => state.auth
