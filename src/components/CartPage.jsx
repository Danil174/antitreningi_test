import React from 'react';
import { inject, observer } from 'mobx-react';

import Category from './Category';
import ProductsList from './ProductsList';

const CartPage = inject('myStore')(observer((props) => {
  if (props.myStore.loadError) {
    return <h3>Ошибка сетевого запроса</h3>;
  }
  return (
    <>
      <h2>Покупки</h2>
      <Category />
      <ProductsList products={props.myStore.products} />
      <button
        onClick={() => { props.myStore.getToken(); }}
      >
        login
      </button>
    </>
  );
}));

export default CartPage;
