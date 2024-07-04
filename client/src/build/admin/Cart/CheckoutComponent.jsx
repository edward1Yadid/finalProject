import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LockIcon from "@mui/icons-material/Lock";
import {  Grid, IconButton } from "@mui/material";
import useFetchOrders from "../../services/hooks/useFetchOrders";
import { useSelector } from "react-redux";
function CheckoutComponent({ open, onClose, onContinue }) {

  const imageUrl = "../images/E-commerce website.jpeg";
  return (
    <Dialog open={open} onClose={onClose}>
      <Grid item sx={12}>
        <IconButton aria-label="">
          <img
            src={imageUrl}
            style={{ width: "100px", height: "60px", alignItems: "center" }}
          />
        </IconButton>
      </Grid>
      <DialogTitle>Continue Order?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to continue with the order?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{backgroundColor:"green"}} variant="contained">
          Keep shpopping
        </Button>
        <Button
          onClick={onContinue}
          color="primary"
          autoFocus
          variant="contained"
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CustomCheckoutComponent() {

  const user = useSelector((appState) => appState.user);
  const {handleCreateOrderByUser}=useFetchOrders()
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleContinueOrder =async() => {
    handleCloseDialog();
    await handleCreateOrderByUser(user?._id)
  
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{ textAlign: "center", p: 2 }}
        >
          <LockIcon
            sx={{ marginRight: 5, textAlign: "center" }}
            color="white"
          />
          Begin Checkout
        </Button>
        <CheckoutComponent
          open={openDialog}
          onClose={handleCloseDialog}
          onContinue={handleContinueOrder}
        />
      </Grid>
    </>
  );
}
