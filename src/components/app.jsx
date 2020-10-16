import React from 'react';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import MainPage from './MainPage';
import CartPage from './CartPage';
import SignInPage from './SignInPage';
import PrivateRoute from './PrivateRoute';

import { AppRoutes } from '../const';

const App = () => {
  return (
    <>
      <div>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink className="nav__link" activeClassName="nav__link--active" to="/" exact>Главная</NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" activeClassName="nav__link--active" to="/cart">Покупки</NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" activeClassName="nav__link--active" to="/sign-in">Авторизация</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route path={AppRoutes.ROOT} exact component={MainPage} />
        <PrivateRoute
          exact
          path={AppRoutes.CART}
          authorizationStatus={`AUTH`}
          render={() => {
            return (
              <CartPage />
            );
          }}
        />
        <Route path={AppRoutes.CART} exact component={CartPage} />
        <Route path={AppRoutes.SIGN_IN} exact component={SignInPage} />
        <Redirect to={AppRoutes.ROOT} />
      </Switch>
    </>
  );
};

export default App;
