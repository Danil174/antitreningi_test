import React from 'react';
import { Grid, Slider } from '@material-ui/core';

const RangeFilter = ({ maxValue, handleFilterChange }) => {
  const [range, setRange] = React.useState([0, 1]);
  const handleValueChange = (evt, value) => {
    setRange(value);
    handleFilterChange(value);
  };

  const isDisabled = maxValue === 0;

  return (
    <Grid
      container
      justify='space-around'
      alignItems='center'
    >
      <b>Фильтр по цене:</b>
      <span>от 0 руб.</span>
      <Slider
        value={range}
        min={0}
        disabled={isDisabled}
        max={maxValue === 0 ? 1 : maxValue}
        onChange={handleValueChange}
        valueLabelDisplay="auto"
        className="range"
      />
      <span>до {maxValue} руб.</span>
    </Grid>
  );
};

export default RangeFilter;
