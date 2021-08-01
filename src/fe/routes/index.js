import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import PageComp from '../containers/PageComp';

const router = () => {
  return(
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        exact
        path="/page/:pageNum"
        component={PageComp}
      />
    </Switch>
  );
};

export default router;
