import { Box, CardContent, Typography } from "@mui/material";

const  CartContent = ({ cart }) => {
  const { product } = cart;


  return (
    <Box>
      <CardContent>
        <Typography variant="h5" color="initial" sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>
      </CardContent>
    </Box>
  );
};
export default CartContent