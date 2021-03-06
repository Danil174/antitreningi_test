import React from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from "prop-types";

const ProductsList = ({ products, deleteProduct, patchProduct }) => {

  if (products.length === 0) {
    return <h3>Список пуст</h3>;
  }

  return (
    <Grid
      container
      justify="center"
    >
      {
        products.map(product => {
          const defaultClass = `product_list__product`;
          const isBoughtClass = product.isBought ? `${defaultClass} product_list__product--isBought` : defaultClass;
          return (
            <Grid
              item xs={3}
              key={product.id}
              component={'article'}
              className={isBoughtClass}
            >
              <span>{product.title}</span>
              <span>Категория: {product.category}</span>
              <span>Количество: {product.amount}</span>
              <span>Цена: {product.price} руб.</span>
              <Button onClick={() => patchProduct(product.id)} color="primary" variant="contained" disableElevation>
                {product.isBought ? 'Куплен' : 'Не куплен'}
              </Button>
              <Button onClick={() => deleteProduct(product.id)} color="secondary" variant="contained" disableElevation>
                Удалить
              </Button>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  patchProduct: PropTypes.func.isRequired,
};

export default ProductsList;
