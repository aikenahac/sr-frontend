import { Route, Switch } from 'react-router-dom';

import { Menu, Order } from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route exact path="/order" component={Order} />
    </Switch>
  );
};

export default Routes;
