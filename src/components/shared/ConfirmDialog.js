import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

const ConfirmDialog =(props)=>{
    const { open, message, onCancelDelete,onConfirmDelete} = props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={open}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">Confirm Action</DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirmDelete} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
}
export default ConfirmDialog;