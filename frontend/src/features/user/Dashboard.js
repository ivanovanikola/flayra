
//   // const userStote = useSelector(userSelector)
//   // const { data: user, isError, isFetching } = useGetUserQuery(userStote.id)

//   // useEffect(() => {
//   //   dispatch(fetchUserBytoken({ token: localStorage.getItem('token')}));
//   // }, []);

//   useEffect(() => {
//     if (!isLogin()) {
//       dispatch(clearState())
//       history.push("/login")
//       }
//   }, [])


import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { removeToken } from "../../utils"
import { clearCredentials } from '../auth/authSlice';
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { loadUser } from '../../app/localStorage'

let CurrentUser = () => {

    const user = useAuth();
    const currentUser = loadUser();
    console.log('currentUser', currentUser);

    let content;

    user.user.username === null ? (
        content = <>{currentUser.author.name}{' '}{currentUser.author.surname}</>
    ) : (
        content = <>{user.user.name}{' '}{user.user.surname}</>
    );

    return (
        <>{content}</>
    );
};

const Dashboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogOut = () => {
        removeToken();
        dispatch(clearCredentials());
        history.push("/login");
    };

    return (
        <>
            <div>
                Привет!
                {''} <CurrentUser />
            </div>
            <Button
                onClick={onLogOut}
            >
                Выйти
            </Button>
        </>
    );
};

export default Dashboard;


