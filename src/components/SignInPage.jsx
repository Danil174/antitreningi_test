import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { AuthorizationStatus, AppRoutes } from "../const.js";

const SignInPage = inject('myStore')(observer((props) => {
  const { myStore, history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    myStore.authorizationStatus === AuthorizationStatus.NO_AUTH
      ?
      <>
        <h2>Авторизация</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            myStore.getToken(email, password, history);
          }}
        >
          <p>Войдите, чтобы увидеть ваш список покупок</p>
          <input
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
            placeholder={'Введите почту'}
            type="text"
            required
          />
          <input
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
            placeholder="Введите пароль"
            type="password"
            required
          />
          <button
            type="submit"
          >
              Войти
          </button>
          {myStore.loginError && <p>Неправильный логин или пароль</p>}
        </form>
      </>
      : <Redirect to={AppRoutes.CART} />
  );
}));

export default SignInPage;
