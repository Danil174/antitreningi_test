import React, { useEffect, useState } from 'react';

import Category from './Category';
import ProductsList from './ProductsList';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.status);
  }
};

const fetchData = (endpoint, method = 'GET', auth = null, body = null, headers = new Headers()) => {
  if (auth) {
    headers.append(`Authorization`, auth);
  }
  headers.append('Content-Type', 'application/json');

  return fetch(endpoint, { method, body, headers })
    .then(checkStatus)
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

const fetchGoods = async (auth) => {
  const goods = await fetchData(`api/goods`, 'GET', auth);
  return goods;
};

const authentication = async () => {
  const body = JSON.stringify({
    email: 'test',
  });
  const auth = await fetchData(`api/login`, 'POST', null, body);
  return auth;
};

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (auth) {
      fetchGoods(auth)
        .then((data) => setProducts(data));
    }
  }, [auth]);

  const handleClick = () => {
    authentication()
      .then((data) => setAuth(data.token));
  };

  console.log(products);
  console.log(auth);

  return (
    <>
      <h2>Покупки</h2>
      <Category />
      <ProductsList products={products} />
      <button
        onClick={handleClick}
      >
        login
      </button>
    </>
  );
};

export default CartPage;
