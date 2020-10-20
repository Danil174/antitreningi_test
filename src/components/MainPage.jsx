import React from 'react';
import { Container, Grid } from '@material-ui/core';

const MainPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <h1>Main Page</h1>
        <p>Лучшее приложение для покупок. Революционный подход к созданию списка покупок!</p>
      </Grid>
    </Container>
  );
};

export default MainPage;
