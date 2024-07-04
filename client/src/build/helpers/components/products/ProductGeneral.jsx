import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ProductHead from "./ProductHead";
import ProductBody from "./ProductBody";
import ProductFooter from "./ProductFooter";

export default function ProductGeneral({ product,wishlistProduct,favoriteProduct,cart ,deleteProduct}) {
  return (
    <Card sx={{ maxWidth: 370, m: 5 }}>
      <ProductHead prodct={product} />
      <CardContent>
        <ProductBody product={product} />
      </CardContent>
      <CardActions>
        <ProductFooter product={product} wishlistProduct={wishlistProduct} favoriteProduct={favoriteProduct} cart={cart} deleteProduct={deleteProduct}/>
      </CardActions>
    </Card>
  );
}
