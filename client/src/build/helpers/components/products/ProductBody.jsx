import { Box, Rating, Typography } from "@mui/material";
import React from "react";

function ProductBody({ product }) {
  const { title, category, price, subcategory, quantity,color,rating } = product;
  const textColor = quantity < 100 ? "red" : "#13A7EC";
  return (
    <>
    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "1px",
          justifyContent: "center",
          padding: 1,
          boxShadow: "inherit",
          
        
        }}
      
      >
        <Typography component="h6" variant="h6" mb={2}>
          {title}
        </Typography>
<Box sx={{display:"flex",flexDirection:"row-reverse",justifyContent:"space-between"}}>
<Rating name="read-only" value={product?.rating} />
        <Typography variant="h6" textAlign={"left"}>
          category: {category}
        </Typography>
</Box>
        <Typography variant="h6" textAlign={"left"}>
          subcategory: {subcategory}
        </Typography>
        <Typography variant="h6" textAlign={"left"}>
          color: {color}
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "#13A7EC" }}
          fontWeight={800}
          textAlign={"left"}
        >
          price: {price}$
        </Typography>
    
        <Typography
          variant="h4"
          textAlign={"left"}
          style={{ fontWeight: 800, color: textColor }}
        >
  {quantity ? `Available in stock: ${quantity}` : `Out of stock: ${quantity}`}

        </Typography>

      </Box>
    </>
  );
}

export default ProductBody;
