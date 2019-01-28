import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...args }) => (
    <AuthConsumer>
      {({ isAuth }) => (
        <Route
          render={
            props =>
            isAuth ? (
              <Component {...props} />
            ) : (
              <Redirect to='/' />
            )}
          {...args}
        />
      )}
    </AuthConsumer>
);

export default ProtectedRoute;
