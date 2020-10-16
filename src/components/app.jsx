import React from 'react';
import { Switch, Route } from "react-router-dom";

import MainPage from './MainPage';
import CartPage from './CartPage';

const App = () => {
  return (
    <Switch>
      <Route path={`/`} exact component={MainPage} />
      <Route exact path={`/add-product`} component={CartPage} />
      <Route exact path={`/my-cart`} component={CartPage} />
      <Route render={() => <h1 style={{ color: 'red', textAlign: 'center' }}>404 not found</h1>} />
    </Switch>
  );
};

export default App;
