import React from 'react';

const ProductsList = ({ products }) => {

  if (products.length === 0) {
    return (<h3>Список пуст</h3>);
  }

  return (
    <div className="product_list">
      {
        products.map(product => {
          const defaultClass = `product_list__product`;
          const isBoughtClass = product.isBought ? `${defaultClass} product_list__product--isBought` : defaultClass;
          return (
            <article key={product.id} className={isBoughtClass}>
              <span>{product.title}</span>
              <span>Количество: {product.amount}</span>
              <span>Цена: {product.amount} руб.</span>
              { product.isBought && <span className="isBought">Товар куплен</span> }
            </article>
          );
        })
      }
    </div>
  );
};

export default ProductsList;
