import { Box, Card } from "@mui/material";
import React from "react";
import CartBody from "./CartBody";

function Cart({ cart,onUpdateQuantity,onRemoveItem,cartUpdateState}) {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 5,
        
      }}
    >
      <Card>
        <CartBody cart={cart} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} cartUpdateState={cartUpdateState}/>
      </Card>
    </Box>
  );
}

export default Cart;
