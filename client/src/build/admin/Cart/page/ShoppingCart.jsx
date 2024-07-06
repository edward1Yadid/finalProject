import React, { useCallback, useEffect, useState } from "react";
import Carts from "./Carts";
import useFetchCarts from "../../../services/hooks/useFetchCarts";
import { useSelector } from "react-redux";
import NavigateToComponents from "../../../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import GeneralPageCompenent from "../../../services/GeneralPageComponent";

function ShoppingCart() {
  const navigate=useNavigate()
  const user = useSelector((appState) => appState.user);
  const quantity = useSelector((appState) => appState.quantity);
  const { handleGetCartByUser,handlermoveItemFromCart,handleupdateQuantityOfProduct} = useFetchCarts();
  const [carts, setCarts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        if (user?._id) {
          const cartsFromData = await handleGetCartByUser(user?._id);
          if(!cartsFromData){
            navigate(NavigateToComponents.HomePage)
          }
          if (cartsFromData) setCarts(cartsFromData);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }

    fetchData();
  }, [user?._id,quantity]);
 

  const handlecartUpdateState = useCallback(async () => {
   const cartsUpdated= await handleGetCartByUser(user?._id);
    setCarts(cartsUpdated);
  }, []);

  const onUpdateQuantity = async (productID, newQuantity) => {
    try {
       await handleupdateQuantityOfProduct(user?._id, productID, newQuantity);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };
  const onRemoveItem= async(productID)=>{
  
    try {
      await handlermoveItemFromCart(user?._id,productID)
   } catch (error) {
     console.error("Error remove product from cart:", error);
   }

  }

  return (
    <>

<GeneralPageCompenent
  title={"Your FashionFusion Shopping Cart"}
  subtitle={"Where Your Style Finds Its Perfect Fit"}
/>
      <Carts onRemoveItem={onRemoveItem} onUpdateQuantity={onUpdateQuantity} cartUpdateState={handlecartUpdateState} carts={carts} />
    </>
  );
}

export default ShoppingCart;
