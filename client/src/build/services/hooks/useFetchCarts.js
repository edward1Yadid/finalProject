import { useCallback, useMemo, useState } from "react";
import {
  UpdateQuantityItemByuser,
  getCartByUser,
  removeItemFromCartByUser,
} from "../axios/carts/cartApiAxios";
import { useSnackbar } from "../../Providers/SnackBarProvider";

function useFetchCarts() {
  const [Isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carts, setsetCarts] = useState(null);
  const [cart, setCart] = useState(null);
const snackMessage=useSnackbar()

const requestStatusCarts = (cart, carts, Isloading, error) => {
    setCart(cart);
    setsetCarts(carts);
    setIsLoading(Isloading);
    setError(error);
  };
const handleGetCartByUser = useCallback(async (userID) => {
    try {
      setIsLoading(true);

      const carts = await getCartByUser(userID);
      requestStatusCarts(cart, carts, false, null);
      snackMessage("Successfully retrieved your cart.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return carts;
    } catch (error) {
      snackMessage("Failed to retrieve your cart. Please try again.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      requestStatusCarts(null, null, false, error);
    }
  }, []);

const handlermoveItemFromCart = useCallback(async (userID, productID) => {
    try {
      setIsLoading(true);
      const cart = await removeItemFromCartByUser(userID, productID);
      snackMessage("Item successfully removed from your cart.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      requestStatusCarts(cart, null, false, null);
      return cart;
    } catch (error) {
      snackMessage("Failed to remove item from your cart. Please try again.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      requestStatusCarts(null, null, false, error);
    }
  }, []);

const handleupdateQuantityOfProduct=useCallback(async (userID,productID, newQuantity)=>{
  try {

    const carts = await UpdateQuantityItemByuser(userID,productID, newQuantity);
    snackMessage("Item quantity successfully updated.", {
      color: "success",
      variant: "filled",
      duration: 5000,
    });
    requestStatusCarts(null, carts, false, null);
    return carts;
  } catch (error) {
    snackMessage("Failed to update item quantity. Please try again.", {
      color: "success",
      variant: "filled",
      duration: 5000,
    });
    requestStatusCarts(null, null, false, error);
  }
},[])


  const value = useMemo(() => {
    return { carts, error, Isloading, cart };
  }, [carts, error, Isloading, cart]);

  return { value, handleGetCartByUser, handlermoveItemFromCart,handleupdateQuantityOfProduct };
}

export default useFetchCarts;
