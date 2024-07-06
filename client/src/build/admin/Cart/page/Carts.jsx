import React, { useEffect, useState } from "react";
import Cart from "../Cart";
import { Container, Grid, Stack, Typography } from "@mui/material";
import CartDetails from "../CartDetails";
import { useNavigate } from "react-router-dom";

function Carts({ carts, onUpdateQuantity, onRemoveItem, cartUpdateState }) {

const [newCart,setNewcart]=useState()
const navigate=useNavigate()

useEffect(()=>{

  setNewcart(carts)
},[carts])

  if (!carts || carts?.length === 0) {
    return (
      <Typography variant="h4" color="initial">
        No product found
      </Typography>
      
    );
  }

  return (
    <Container>
      <Grid container >
        <Grid item xs={12} md={8}>
          <Stack
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {carts.map((cart, index) => (
              <Cart
                key={index}
                cart={cart}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                cartUpdateState={cartUpdateState}
              />
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          mt={1}
          xs={12}
          md={4}
          sx={{
            position: { md: "sticky" },
            top: { md: "30%", xs: "auto" }
          }}
        >
          <CartDetails carts={newCart} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Carts;
