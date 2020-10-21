import React, { useState, useRef } from 'react';
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

const NewProductDialog = inject('myStore')(observer((props) => {
  const [open, setOpen] = useState(false);
  const [category, setAge] = React.useState('');
  const formData = useRef(null);

  const categoriesArr = props.myStore.categories.map(it => it.label);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
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
            const data = new FormData(formData.current);
            data.append('category', 'продукты'); //WIP
            props.myStore.addproduct(data);
            handleClose();
          }}
          ref={formData}
        >
          <TextField
            autoFocus
            name="title"
            label="Название"
            type="text"
            required
          />
          <TextField
            name="price"
            label="Цена"
            type="number"
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
              value={category}
              onChange={handleChange}
              required
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
