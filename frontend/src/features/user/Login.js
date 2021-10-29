import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from './userSlice';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components/Spinner'


const Login = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const { register, formState: { errors }, handleSubmit } = useForm();
  // const { isFetching, isSuccess, isError } = useSelector(
  //   userSelector
  // );
  // const onSubmit = (data) => {
  //   dispatch(loginUser(data));
  //   console.log(data)
  // };
  // useEffect(() => {
  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, []);
  // useEffect(() => {
  //   if (isError) {
  //   //   error(errorMessage);
  //     dispatch(clearState());
  //   }
  //   if (isSuccess) {
  //     dispatch(clearState());
  //     history.push('/');
  //   }
  // }, [isError, isSuccess]);
  // return (
  //   <>
  //     <div className="">
  //       <div className="">
  //         <h2 className="">
  //         Войдите в свой аккаунт
  //         </h2>
  //       </div>
  //       <div className="">
  //         <div className="">
  //            <form
  //             className=""
  //             onSubmit={handleSubmit(onSubmit)}
  //             method="POST"
  //           >
  //          <div>
  //               <label
  //                 htmlFor="email"
  //                 className=""
  //               >
  //                 Email адрес:
  //               </label>
  //               <div className="">
  //               <input 
  //                 id="email_login"
  //                 name="email"
  //                 type="email"
  //                 autoComplete="email"
  //                 {...register("identifier", { required: true , pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })}
  //               />
  //               </div>
  //               {errors.email && <span style={{color: 'red'}}>Обязательное поле</span>}
  //               </div>
  //             <div>
  //               <label
  //                 htmlFor="password_login"
  //                 className=""
  //               >
  //                 Пароль:
  //               </label>
  //               <div className="">
  //               <input  
  //                   id="password"
  //                   name="password"
  //                   type="password" 
  //                   autoComplete="current-password" 
  //                   {...register("password", { required: true })} 
  //                   className=""
  //               />
  //               </div>
  //               {errors.password && <span style={{color: 'red'}}>Обязательное поле</span>}  
  //             </div>
  //             <div>
  //               <button
  //                 type="submit"
  //                 className=""
  //               >
  //                 {isFetching ? (
  //                     <Spinner text="Регистрация..." />
  //                 ) : null}
  //                 Войти
  //               </button>
  //             </div>
  //           </form>
  //           <div className="">
  //             <div className="">
  //               <div className="">
  //                 <span className="">
  //                   или <Link to="signup"> Зарегистрироваться</Link>
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};
export default Login;