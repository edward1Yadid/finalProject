import React, { useEffect, useState } from "react";
import AddIconfrom from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import NavigateToComponents from "../../../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import useFetchProduct from "../../../services/hooks/useFetchProduct";
import {
  createCartByUser,
  getCartByUserProduct,
} from "../../../services/axios/carts/cartApiAxios";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { appStore } from "../../../redux/Store";
import { quantityActionCreator } from "../../../redux/QuantitySlice";
import useFetchCarts from "../../../services/hooks/useFetchCarts";
import HeartAnimation from "./HeartAnimation";


function ProductFooter({ product, wishlistProduct, favoriteProduct, cart,deleteProduct }) {
  const [quantity, setQuantity] = useState(0);
  const user = useSelector((appState) => appState.user);
  const {    handleDeleteProductByAdmin,    handlewishlistUser,  handleFavoriteProductByUser,  } = useFetchProduct();
  const { handleGetCartByUser } = useFetchCarts();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        cart?.forEach(async (p) => {
          if (p?.product?._id === product?._id) {
            let quantity = await getCartByUserProduct(user?._id, product?._id);
            if (quantity) {
              setQuantity(quantity);
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartData();
  }, [cart]);

  function wishlist() {
    return !!user && !!product.wishlist.find((userid) => userid === user?._id);
  }
  function userLikedProduct() {
    return !!user && !!product.likes.find((userid) => userid === user?._id);
  }

  const [memoizedWishlistProductState, toggelwishlisth] = useState(wishlist);
  const [memoizedLikeProductState, toggleLikeProduct] =
    useState(userLikedProduct);
  const DeleteProductByAdmin = async () => {
    await handleDeleteProductByAdmin(product?._id);
    await deleteProduct()
  };

  const handleQuantityChangeProduct = async (newQuantity) => {
    try {
      setQuantity(newQuantity);
      await createCartByUser(user?._id, product?._id, newQuantity);
      let cartsFromData = await handleGetCartByUser(user?._id);
      if (cartsFromData) {
        const totalQuantity = cartsFromData.reduce((acc, item) => {
          const quantity = item.quantity;
          return acc + quantity;
        }, 0);
        appStore.dispatch(quantityActionCreator.setQuantity(totalQuantity));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    if (!user) return null;
    try {
      toggelwishlisth(
        (memoizedWishlistProductState) => !memoizedWishlistProductState
      );

      await handlewishlistUser(user?._id, product?._id);
      if (typeof wishlistProduct === "function") {
        await wishlistProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoriteProducts = async () => {
    if (!user) return null;
    try {
      toggleLikeProduct(
        (memoizedLikeProductState) => !memoizedLikeProductState
      );
      await handleFavoriteProductByUser(user?._id, product?._id);
      if (typeof favoriteProduct === "function") {
        await favoriteProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
      
    >
      <Box>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => handleQuantityChangeProduct(quantity + 1)}
          disabled={!user || product?.quantity===0}
        >
          <AddIconfrom />
        </IconButton>
        {quantity !== 0 && (
          <TextField
            id="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => {
              const newValue = Math.max(0, parseInt(e.target.value) || 0);
              setQuantity(newValue);
            }}
            disabled
            size="small"
            style={{ width: "80px", padding: "0 15px" }}
          />
        )}

        <IconButton
          color="primary"
          aria-label="remove from shopping cart"
          onClick={() =>
            handleQuantityChangeProduct(quantity > 1 ? quantity - 1 : 1)
          }
          disabled={quantity <= 1}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton aria-label="ThumbUpIcon" onClick={handleFavoriteProducts}>
          <ThumbUpIcon
            sx={{ color: memoizedLikeProductState ? "red" : "inherit" }}
          />
        </IconButton>
        <IconButton aria-label="SaveIcon" onClick={handleWishlist}>
          <BookmarkIcon
            sx={{ color: memoizedWishlistProductState ? "#E0A8B6" : "inherit" }}
          />
        </IconButton>
      </Box>
    
      <Box>
        {user?.isAdmin && (
          <>
            <IconButton
              color="primary"
              aria-label="Edit Product"
              onClick={() =>
                navigate(`${NavigateToComponents.EDIT_Profuct}/${product?._id}`)
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={DeleteProductByAdmin}
              disabled={!user?.isAdmin}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
           
           {memoizedLikeProductState && <HeartAnimation containerId={`heart-container-${product?._id}`} />}
      </Box>

    </Box>
  );
}

export default ProductFooter;
