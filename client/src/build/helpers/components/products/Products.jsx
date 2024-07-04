import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import ProductGeneral from "./ProductGeneral";
function Products({ products, wishlistProduct, favoriteProduct,cart,deleteProduct }) {
  if (!products.length) {
    return (
      <Typography variant="h4" color="initial">
        No products found
      </Typography>
    );
  }
  return (
    <Container maxWidth="xxl">
      <Stack
        spacing={2}
        gap={4}
        direction="row"
        
        pt={5}
        flexWrap="wrap"
        justifyContent="center"
        alignItems={"center"}
        minWidth={"100%"}
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",

          padding: '16px',
      
        }}
      >
        {products &&
          products.map((product, index) => {
            return (
              <ProductGeneral
                product={product}
                key={index}
                wishlistProduct={wishlistProduct}
                favoriteProduct={favoriteProduct}
                deleteProduct={deleteProduct}
                cart={cart}
              ></ProductGeneral>
            );
          })}
      </Stack>
    </Container>
  );
}

export default Products;
