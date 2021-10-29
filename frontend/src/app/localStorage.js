export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;

        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;

    }

};

export const loadUser = () => {
    try {
        const serializedState = localStorage.getItem('USER_DETAILS');
        if (serializedState === null) {
            return undefined;

        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;

    }

};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);

    } catch (err) {
        //Ignore, look into console
    }

};

// export const loadToken = () => {
//     try {
//         const serializedState = localStorage.getItem('token');
//         if (serializedState === null) {
//             return undefined;

//         }
//         return JSON.parse(serializedState);
//     } catch (err) {
//         return undefined;

//     }

// };

// export const saveToken = (token) => {
//     try {
//         const serializedState = JSON.stringify(token.jwt);
//         localStorage.setItem('token', serializedState);

//     } catch (err) {
//         //Ignore, look into console
//     }

// };

// export const clearToken= () => {
//     try {
//         localStorage.removeItem('token');
//     } catch (err) {
//         return undefined;
//     }
// };


// export const isCurrentUser = () => {
//     try {
//       const currentUser = loadState();
//       if (currentUser.auth.token === null) {
//         console.error('Error token: token still is null');
//         return false
//       }
//       return true
//     } catch (err) {
//       return undefined;
//     }
//   }