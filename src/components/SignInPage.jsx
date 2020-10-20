import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Container, Grid, TextField, Button } from '@material-ui/core';

import { AuthorizationStatus, AppRoutes } from "../const.js";

const SignInPage = inject('myStore')(observer((props) => {
  const { myStore, history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    myStore.authorizationStatus === AuthorizationStatus.NO_AUTH
      ?
      <Container>
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <h2>Авторизация</h2>
          <Grid
            item xs={12}
            container
            spacing={3}
            direction="column"
            alignItems="center"
            component={'form'}
            onSubmit={(evt) => {
              evt.preventDefault();
              myStore.getToken(email, password, history);
            }}
          >
            <Grid item xs={12}>
              <p>Авторизуйтесь, чтобы увидеть ваш список покупок</p>
            </Grid>
            <Grid
              item
              xs={8}
              container
              alignItems="center"
              justify="space-between"
            >
              <TextField
                value={email}
                onChange={(evt) => setEmail(evt.currentTarget.value)}
                label="email"
                type="text"
                variant="outlined"
                required
              />

              <TextField
                value={password}
                onChange={(evt) => setPassword(evt.currentTarget.value)}
                label="Password"
                type="password"
                variant="outlined"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
            </Grid>
            {myStore.loginError && <p className="error">Неправильный логин или пароль</p>}
          </Grid>
        </Grid>

      </Container>
      : <Redirect to={AppRoutes.CART} />
  );
}));

export default SignInPage;
