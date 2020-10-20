import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Grid } from '@material-ui/core';

import ProductsList from './ProductsList';
// import Spinner from './Spinner';
import NewProductDialog from './NewProductDialog';

const CartPage = inject('myStore')(observer((props) => {
  useEffect(() => {
    props.myStore.fetchProducts();
  }, []);

  // if (props.myStore.loadGoods) {
  //   return <Spinner />;
  // }

  if (props.myStore.loadError) {
    return <h3>Ошибка сетевого запроса</h3>;
  }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <h2>Покупки</h2>
        <ProductsList
          products={props.myStore.products}
          deleteProduct={props.myStore.deleteProduct}
          patchProduct={props.myStore.patchProduct}
        />
        <Grid item xs={12}>
          <NewProductDialog />
        </Grid>
        <Grid item xs={12}>
          <p>Общая стоимость корзины: {props.myStore.productsCost}</p>
          <p>Стоимость купленных товаров: {props.myStore.boughtProductsCost}</p>
        </Grid>
      </Grid>
    </Container>
  );
}));

export default CartPage;
