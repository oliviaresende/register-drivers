
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

const Drivers = React.lazy(() => import('./pages/drivers/index.js'));

const Routes = props => (
  <Suspense fallback={<Spin size="large" />}>
    <Switch>
      <Route exact path="/" component={routerProps => <Drivers {...routerProps} />} />
    </Switch>
  </Suspense>
)

export default Routes;