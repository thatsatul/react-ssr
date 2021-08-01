import React from 'react';
import { Switch, Route } from 'react-router-dom';
import allRoutes from '../../routes';

const router = () => {
  return(
    <Switch>
      {allRoutes.map(route => (
        <Route
          key={route.url}
          path={route.url}
          exact={route.exact}
          render={(ownProps) => {
            return <route.comp {...ownProps} loadData={route.loadData} />;
          }}
        />
      ))}
    </Switch>
  );
};

export default router;
