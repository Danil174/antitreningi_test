import React from 'react';
import { Redirect } from "react-router-dom";
import { AppRoutes, AuthorizationStatus } from '../const';

const SignInPage = () => {
  return (
    `AUTH` === AuthorizationStatus.AUTH ?
      <Redirect to={AppRoutes.ROOT} />
      :
      <>
        <h2>Авторизация</h2>
        <p>Войдите, чтобы увидеть ваш список покупок</p>
        <input
          placeholder={'Введите почту'}
          type="text"
          required
        />
        <input
          placeholder="Введите пароль"
          type="password"
          required
        />
        <button type="submit">Войти</button>
      </>
  );
};

export default SignInPage;
