import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthorizationStatus, AppRoutes } from "../const.js";
import PropTypes from "prop-types";


const PrivateRoute = (props) => {
  const { render, path, exact, authorizationStatus } = props;

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

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
