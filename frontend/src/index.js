import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
// import { worker } from './api/server'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { extendedModsApiSlice } from './features/mods/modsSlice'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import { apiSlice}  from '../src/features/api/apiSlice'
import { loadState, saveState} from '../src/app/localStorage'
import authReducer from '../src/features/auth/authSlice'
import throttle from 'lodash/throttle'
import ruRU from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';



TimeAgo.addLocale(ru)



// // Start our mock API server
// worker.start({ onUnhandledRequest: 'bypass' })

// store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
// store.dispatch(extendedModsApiSlice.endpoints.getMods.initiate())


ReactDOM.render(
  <React.StrictMode>
    
    <Provider store={store} >
    <ConfigProvider locale={ruRU}>
      <App />
      </ConfigProvider>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);




