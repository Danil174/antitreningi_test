import React, { useEffect, useState } from 'react';

import Category from './Category';

const checkStatus = (response) => {
  console.log(response);
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
  headers.append('mode', 'no-cors');
  headers.append('Content-Type', 'application/json');

  return fetch(endpoint, { method, body, headers })
    .then(checkStatus)
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

const fetchGoods = async (auth) => {
  const goods = await fetchData(`http://tranquil-fortress-33065.herokuapp.com/api/goods`, 'GET', auth);
  return goods;
};

const authentication = async () => {
  const body = JSON.stringify({
    email: 'test',
  });
  const auth = await fetchData(`http://tranquil-fortress-33065.herokuapp.com/api/login`, 'POST', null, body);
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
      <ul>
        <li>Молоко</li>
        <li>Сыр</li>
        <li>Бананы</li>
        <li>Мыло</li>
      </ul>
      <button
        onClick={handleClick}
      >
        login
      </button>
    </>
  );
};

export default CartPage;
