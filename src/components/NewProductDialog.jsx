import React, { useState, useRef } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { inject, observer } from 'mobx-react';

const NewProductDialog = inject('myStore')(observer((props) => {
  const [open, setOpen] = useState(false);
  const formData = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open form dialog
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
