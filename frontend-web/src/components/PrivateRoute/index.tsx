import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';

type Props = {
  path: string;
  children: React.ReactNode;
};

const PrivateRoute = ({ path, children }: Props) => {
  return (
    <Route
      path={path}
      render={({location}) =>
        isAuthenticated() ? children : <Redirect to={{
            pathname: "/admin/auth/login",
            state: {from: location}
        }} />
      }
    />
  );
};

export default PrivateRoute;
