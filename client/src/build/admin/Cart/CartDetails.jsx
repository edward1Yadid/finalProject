import React from 'react';
import {  Container, Divider, Grid, Typography } from '@mui/material';
import CustomCheckoutComponent from './CheckoutComponent';


function CartDetails({ carts }) {
  const discountPercent = 0.1;
  const taxRate = 0.07; 

  if (carts) {
    const totalPrice = carts.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    const discount = totalPrice * discountPercent;
    const tax = (totalPrice - discount) * taxRate;
    const finalTotal = totalPrice - discount + tax;

    return (
      <Container  sx={{ mt:21.6, backgroundColor:"#A6B891", padding: "16px", borderRadius: '8px' }} >
        <Typography variant="h6" color="initial" fontWeight={"bolder"} fontFamily={"monospace"} >
          Checkout Summary
        </Typography>
        <Grid container spacing={5} >
          <Grid item xs={6}>
            <Typography variant="body1" color="initial" align="left" >
              Subtotal:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial" align="right">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" color="initial" align="left">
              Discount for the first 50 customers:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" color="initial" align="right">
             (${discount.toFixed(2)})
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial" align="left">
              Tax:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial" align="right">
              ${tax.toFixed(2)}
            </Typography>
            
          </Grid>

          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="initial" fontWeight="bold" align="left">
              Total:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="initial" fontWeight="bold" align="right">
              ${finalTotal.toFixed(1)}
            </Typography>
          </Grid>
   <CustomCheckoutComponent />
        </Grid>
   
        
      </Container>
    );
  }

  return (
    <Container sx={{ backgroundColor: "white", padding: "16px", borderRadius: '8px' }}>
      <Typography variant="h6" color="initial">Checkout</Typography>
      <Typography variant="body1" color="initial">No items in cart.</Typography>
    </Container>
  );
}

export default CartDetails;
