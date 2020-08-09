import React from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";

import { useAuth } from "../hooks/auth";

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  console.log();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!signed ? (
          <Component />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default Route;
