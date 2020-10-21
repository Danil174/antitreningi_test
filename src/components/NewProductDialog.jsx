import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { inject, observer } from 'mobx-react';

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange
  };
};

const NewProductDialog = inject('myStore')(observer((props) => {
  const [open, setOpen] = useState(false);

  const categoriesArr = props.myStore.categories.map(it => it.label);

  const title = useInput('');
  const category = useInput('');
  const price = useInput(1);
  const amount = useInput(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Добавить новый товар
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавить покупку</DialogTitle>
        <Grid
          container
          direction="column"
          alignItems="center"
          component={'form'}
          onSubmit={(evt) => {
            evt.preventDefault();
            const data = {
              title: title.value,
              category: category.value,
              price: Number(price.value),
              amount: Number(amount.value),
            };
            props.myStore.addproduct(data);
            handleClose();
          }}
        >
          <TextField
            autoFocus
            name="title"
            label="Название"
            type="text"
            {...title}
            required
          />
          <TextField
            name="price"
            label="Цена"
            type="number"
            {...price}
            InputProps={{
              inputProps: {
                min: 1
              }
            }}
            required
          />
          <TextField
            name="amount"
            label="Количество"
            type="number"
            {...amount}
            InputProps={{
              inputProps: {
                min: 1
              }
            }}
            required
          />
          <FormControl style={{ 'width': '80%' }}>
            <InputLabel id="category">Категория</InputLabel>
            <Select
              labelId="category"
              name="category"
              {...category}
            >
              {categoriesArr.map(it => {
                return <MenuItem value={it} key={it}>{it}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}));

export default NewProductDialog;
