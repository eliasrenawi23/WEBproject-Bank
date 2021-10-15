import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function CustomerDialog({onYes, onNo, title, body}, ref) {
  const [show, setShow] = useState(false);

  const onNoClick = () => {
    setShow(false);
    if (onNo) onNo();
  };
  const onYesClick = () => {
    setShow(false);
    if (onYes) onYes();
  };
  useImperativeHandle(ref, () => ({
    showDialog: () => {
      setShow(true);
    },
    closeDialog: () => {
      setShow(false);
    },
  }));
  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNoClick} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={onYesClick} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default forwardRef(CustomerDialog);
