import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'util/auth';

type Props = {
  path: string;
  roles?: Role[];
  children: React.ReactNode;
};

const PrivateRoute = ({ path, roles = [], children }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/admin/auth/login',
              state: { from: location },
            }}
          />
        ) : !hasAnyRoles(roles) ? (
          <Redirect to="/admin/products" />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
