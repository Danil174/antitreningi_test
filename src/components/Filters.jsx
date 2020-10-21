import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';

import RangeFilter from "./RangeFilter";
import Category from "./Category";

const Filters = inject('myStore')(observer(({ myStore }) => {
  useEffect(() => {
    myStore.fetchCategories();
  }, []);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="filters"
    >
      <RangeFilter
        maxValue={myStore.maxPrice}
        handleFilterChange={myStore.setFilterRangeValue}
      />
      <Category
        categories={myStore.categories}
        handleChange={myStore.putCategories}
      />
    </Grid>
  );
}));

export default Filters;