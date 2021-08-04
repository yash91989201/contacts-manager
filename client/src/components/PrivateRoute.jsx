import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = true;
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/intro" />
          );
        }}
      />
    </>
  );
};

export default PrivateRoute;
