// export const setToken = (data) => {
//     localStorage.setItem('token', data.jwt);
// }

// export const setUser = (user) => {
//     try {
//         const serializedState = JSON.stringify(user);
//         localStorage.setItem('user', serializedState);
//     } catch (error) {
//         //Ignore, look into console
//     }
// }

export const removeToken = () => {
    localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
}

export const removeUser = () => {
    localStorage.removeItem('user');
}

export const isToken = () => {
    if (localStorage.getItem('token')) {
        return true;
    }
    return false;
}