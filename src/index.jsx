import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import storeInstance from './store/Store';
import { Provider } from 'mobx-react';

import App from './components/App';

export const StoreContext = React.createContext();

ReactDOM.render(
  <Provider myStore={storeInstance}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector(`#root`)
);
