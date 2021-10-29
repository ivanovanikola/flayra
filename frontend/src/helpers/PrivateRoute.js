import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../features/auth/authProvider';


export const PrivateRoute = ({component: Component, ...rest}) => {

    const [logged] = useAuth();

  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
            logged ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};