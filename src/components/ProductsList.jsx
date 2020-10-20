import React from 'react';
import { Grid } from '@material-ui/core';

const ProductsList = ({ products }) => {

  if (products.length === 0) {
    return (<h3>Список пуст</h3>);
  }

  return (
    <Grid
      container
      spacing={1}
      justify="center"
    >
      {
        products.map(product => {
          const defaultClass = `product_list__product`;
          const isBoughtClass = product.isBought ? `${defaultClass} product_list__product--isBought` : defaultClass;
          return (
            <Grid item xs={3} key={product.id} component={'article'} className={isBoughtClass} style={{'margin': '10px'}}>
              <span>{product.title}</span>
              <span>Количество: {product.amount}</span>
              <span>Цена: {product.amount} руб.</span>
              { product.isBought && <span className="isBought">Товар куплен</span> }
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default ProductsList;
