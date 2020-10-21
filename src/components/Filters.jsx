import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Checkbox, FormControlLabel } from '@material-ui/core';

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
      <FormControlLabel
        control={
          <Checkbox
            onChange={myStore.setShowFilters}
            color="primary"
          />
        }
        label="Применить фильтры"
      />
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
