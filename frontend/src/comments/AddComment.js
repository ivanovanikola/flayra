import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addComment } from './commentsSlice';
import { useDispatch } from "react-redux"
import { isToken } from '../utils';
import { useSelector } from "react-redux"
import { userSelector } from '../features/user/userSlice'
import { useGetUserQuery } from '../features/api/apiSlice'

let Comment = ({ authorId, postId }) => {

  const dispatch = useDispatch();
  const { register, reset, formState, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      author: authorId,
      post: postId,

    }
  }
  );
  const onSubmit = (data) => {
    dispatch(addComment(data));
    console.log(data)
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ content: '' });
    }
  }, [formState, reset]);

  let content
  isToken() ? (
    content = (

      <div className="">
        <div className="">
          <h2 className="">
            Оставьте свой комментарий
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
                  htmlFor="content"
                  className=""
                >
                  Комментарий:
                </label>
                <div className="">
                  <input
                    id="comment"
                    name="comment"
                    type="text"
                    {...register("content", { required: true })}
                  />
                </div>
                {errors.content && <span style={{ color: 'red' }}>Обязательное поле</span>}
              </div>
              <div>
                <button
                  type="submit"
                  className=""
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    )) : content = <div>Сначала войдите</div>
  return <>{content}</>
};

export const AddComment = ({ postId }) => {

  const userStote = useSelector(userSelector)
  const { data: user, isSuccess, isError} = useGetUserQuery(userStote.id)
  
  let content

  if (isSuccess) {
    content = (
      <Comment authorId={user.author} postId={postId} />
    )
  } else if (isError) {
    content = <div>Сначала войдите</div>
  }

  return <>{content}</>
}
