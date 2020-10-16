import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthorizationStatus, AppRoutes } from "../const.js";


const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(props)
            : <Redirect to={AppRoutes.SIGN_IN} />
        );
      }}
    />
  );
};

export default PrivateRoute;
