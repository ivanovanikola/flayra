import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../features/auth/authProvider';


export const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const [logged] = useAuth();

    return (
        <Route {...rest} render={props => (
            logged && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};
