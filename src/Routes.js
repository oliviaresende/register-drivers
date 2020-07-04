
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

const Drivers = React.lazy(() => import('./pages/drivers'));
const Form = React.lazy(() => import('./pages/form'));

const Routes = props => (
  <Suspense fallback={<Spin size="large" />}>
    <Switch>
      <Route exact path="/" component={routerProps => <Drivers {...routerProps} />} />
      <Route exact path="/form" component={routerProps => <Form {...routerProps} />} />
    </Switch>
  </Suspense>
)

export default Routes;