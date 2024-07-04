import {
  CardMedia,
  Grid,
  IconButton,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import AddIconfrom from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartContent from "./CartContent";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { quantityActionCreator } from "../../redux/QuantitySlice";
import { useSelector } from "react-redux";
import useFetchCarts from "../../services/hooks/useFetchCarts";
import { appStore } from "../../redux/Store";
const CartBody = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  cartUpdateState,
}) => {
  const user = useSelector((appState) => appState.user);
  const { handleGetCartByUser } = useFetchCarts();
  const { product, quantity: initialQuantity } = cart;
  const { price, image } = product;
  const [quantity, setQuantity] = useState(initialQuantity);

  
  const handleQuantityChange =async (newQuantity) => {
    if (newQuantity >= 1) {

      setQuantity(newQuantity);
    await  onUpdateQuantity(product?._id, newQuantity);
      let cartsFromData = await handleGetCartByUser(user?._id);
      if (cartsFromData) {
        const totalQuantity = cartsFromData.reduce((acc, item) => {
          const quantity = item.quantity;
          return acc + quantity;
        }, 0);
        appStore.dispatch(quantityActionCreator.setQuantity(totalQuantity));
      }

    }
  };
  const handleRemoveItem = async () => {
    await onRemoveItem(product?._id);
    await cartUpdateState();
    let cartsFromData = await handleGetCartByUser(user?._id);
    if (cartsFromData) {
      const totalQuantity = cartsFromData.reduce((acc, item) => {
        const quantity = item.quantity;
        return acc + quantity;
      }, 0);
      appStore.dispatch(quantityActionCreator.setQuantity(totalQuantity));
    }
  };
  const total = (price * quantity).toFixed(2);
  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: 700, backgroundColor: "#A6B891" }}
    >
      <Grid container spacing={2} xs={12} item>
        <Grid item xs={1}>
          <Button
            onClick={handleRemoveItem}
            variant="filled"
            startIcon={<ClearIcon />}
          />
        </Grid>
        <Grid item xs={11}>
          <CartContent cart={cart} />
        </Grid>
      </Grid>

      <Grid container spacing={2} xs={12} p={3} ml={1}>
        <Grid item xs={4} md={3} sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.9)" }}>
            <CardMedia
              image={`${image.url}`}
              component={"img"}
              alt={`${image.alt}`}
              sx={{ width: { xs: "100px", md: "200px" } }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="initial">
            ${price}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            id="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            inputProps={{ min: 1 }}
            sx={{
              "& .MuiInputBase-root": {
                padding: { sx: "0px 25%", md: "0px 35%" },
              },
            }}
          />
          <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
            <AddIconfrom />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={1}
          md={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="initial">
            ${total}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartBody;
