import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from './userSlice';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components/Spinner'

const Signup = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const history = useHistory();

  const { isFetching, isSuccess, isError } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }

    if (isError) {
      //   toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="">
        <div className="">
          <h2 className="">
            Зарегистрируйте аккаунт
          </h2>
        </div>
        <div className="">
          <div className="">
            <form
              className=""
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
            >
              <div>
                <label
                  for="username"
                  className=""
                >
                  Имя:
                </label>
                <div className="">
                  <input
                    id="username_singup"
                    name="username"
                    type="text"
                    autoComplete="username"
                    {...register("username", { required: true })}
                  />
                </div>
                {errors.username && <span style={{ color: 'red' }}>Обязательное поле</span>}
              </div>
              <label
                for="email"
                className=""
              >
                Email адрес:
              </label>
              <div>
                <div className="">
                  <input
                    id="email_singup"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })}
                  />
                </div>
                {errors.email && <span style={{ color: 'red' }}>Обязательное поле</span>}
              </div>

              <div>
                <label
                  for="password"
                  className=""
                >
                  Пароль:
                </label>
                <div className="mt-1">
                  <input
                    id="password_singup"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", { required: true })}
                    className=""
                  />
                </div>
                {errors.password && <span style={{ color: 'red' }}>Обязательное поле</span>}

              </div>
              <div>
                <button
                  type="submit"
                  className=""
                >
                  {isFetching ? (
                    <Spinner text="Регистрация..." />
                  ) : (
                    <p>Регистрация</p>
                  )}
                </button>
              </div>
              {/* TODO: Добавить валидацию
              1) если пользователь с таким именем или emai уже существует (сейчас сервер вернет 400) 
              2) если необходимо вводить только латиницу 
              3) Очищать поля после ввода без перезагрузки страницы .. */}
            </form>
            <div className="">
              <div className="">
                <div className="">
                  <span className="">
                    или <Link to="login"> Войти</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// Email отностся к персональным данным (ссылка на закон), если согласны то ОК)
export default Signup;