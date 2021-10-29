import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'
import { apiSlice } from '../features/api/apiSlice'
import userReducer from '../features/user/userSlice'
import authReducer from '../features/auth/authSlice'
import { loadState, saveState, loadToken, saveToken} from '../../src/app/localStorage'
import throttle from 'lodash/throttle'




const persistedState = loadState();
// const persistedToken = loadToken();

console.log('persistedState', persistedState)
// console.log('persistedToken', persistedToken)


export const  store = configureStore({
  
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  
  },
  persistedState,
  // persistedToken,
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware().concat(apiSlice.middleware),
  
  
});

// store.subscribe(throttle(() => {
//   saveState({
//     auth: store.getState().auth, 
//   });
//   // saveToken({
//   //   token: store.getState().auth.token, 
//   // });
// }, 1000));

