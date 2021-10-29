import { useCallback, useEffect, useState } from 'react';

const createTokenProvider = () => {

    const localStorageKey = 'USER_DETAILS';
    const accessTokenKey = 'jwt';
    const refreshTokenKey = 'refresh';


    const onUpdateToken = async (tokens) => {
        try {
            const token = tokens[refreshTokenKey];
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/refreshToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify({
                        token,
                        "renew": "true",
                    })
            });
            const newToken = await response.json();
            if (response.status === 200) {
                setToken(newToken)
            };
        } catch (e) {
            console.error('Token update failed', e);
        };
    };



    let listeners = [];

    const getTokenInternal = () => {
        const data = localStorage.getItem(localStorageKey);
        const token = (data && JSON.parse(data)) || null;
        return token;
    };

    const subscribe = (listener) => {
        listeners.push(listener);
    };

    const unsubscribe = (listener) => {
        listeners = listeners.filter(l => l !== listener);
    };

    const jwtExp = (token) => {
        if (!(typeof token === 'string')) {
            return null;
        }
        const split = token.split('.');

        if (split.length < 2) {
            return null;
        }
        try {
            const jwt = JSON.parse(atob(token.split('.')[1]));
            if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
                return jwt.exp * 1000;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    };
    const getExpire = (token) => {

        if (!token) {
            return null;
        };
        if (accessTokenKey) {
            const exp = jwtExp(token[accessTokenKey]);
            if (exp) {
                return exp;
            };
            return jwtExp(token);
        };
    };

    const isExpired = (exp) => {
        if (!exp) {
            return false;
        };
        return Date.now() > exp;
    };

    const checkExpiry = async () => {
        const token = getTokenInternal();
        if (token && isExpired(getExpire(token))) {
            const newToken = onUpdateToken ? await onUpdateToken(token) : null;

        };
    };

    const getToken = async () => {
        await checkExpiry();
        return getTokenInternal();
    };

    const isLoggedIn = () => {
        const token = getTokenInternal();
        return !!token;
    };

    const setToken = (token) => {
        if (token) {
            try {
                const serializedState = JSON.stringify(token);
                localStorage.setItem(localStorageKey, serializedState);
            } catch (error) {
                //Ignore, look into console
            }
        } else {
            localStorage.removeItem(localStorageKey);
        }
        notify();
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        listeners.forEach(l => l(isLogged));
    };
    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

const createAuthProvider = () => {

    const tokenProvider = createTokenProvider();

    const login = (newTokens) => {
        tokenProvider.setToken(newTokens);
    };

    const logout = () => {
        tokenProvider.setToken(null);
    };

    const authFetch = async (input, init) => {
        const token = await tokenProvider.getToken();

        init = init || {};

        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`,
        };
        return fetch(input, init);
    };

    const checkToken = async () => {
        const token = await tokenProvider.getToken();
        return token;
    };

    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

        const listener = useCallback(
            (newIsLogged) => {
                setIsLogged(newIsLogged);
            },
            [setIsLogged],
        );

        useEffect(() => {
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, [listener]);
        return [isLogged];
    };

    const setUser = (user) => {
        try {
            const serializedState = JSON.stringify(user);
            localStorage.setItem('user', serializedState);
        } catch (error) {
            //Ignore, look into console
        };
    };



    return {
        useAuth,
        authFetch,
        login,
        logout,
        setUser,
        checkToken,

    };
};

export const { useAuth, authFetch, logout, login, setUser, checkToken } = createAuthProvider();

