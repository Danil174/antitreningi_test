import React from 'react';

import Category from './Category';

const CartPage = () => {
  return (
    <>
      <h2>Покупки</h2>
      <Category />
      <ul>
        <li>Молоко</li>
        <li>Сыр</li>
        <li>Бананы</li>
        <li>Мыло</li>
      </ul>
    </>
  );
};

export default CartPage;
