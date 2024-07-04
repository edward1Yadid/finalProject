import React, { useCallback, useEffect, useState } from "react";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers";

import NavigateToComponents from "../../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import GeneralPageCompenent from "../../services/GeneralPageComponent";
function Wishlist() {
  
const navigate=useNavigate()
  const {
    value: { error, Isloading,products,product },

  handleGetwishlistproduct
  } = useFetchProduct();

  useEffect(() => {
    const fetchData = async () => {
      await handleGetwishlistproduct();
    };

    fetchData();
  }, [product]);


  const handleEditWishList = async () => {
    await handleGetwishlistproduct();
  };


  return (
    <div>
    {products?.length===0 &&(
     <>
      {navigate(NavigateToComponents.HomePage)}
      {alert("you dont have any list of product")}
     </>
    )}

<GeneralPageCompenent title={"Your FashionFusion Wishlist"} subtitle={"Where Dreams Meet Style - Curate Your Perfect Collection"}/>
      <ExpirienceCustomers
        Isloading={Isloading}
        error={error}
        products={products}
        wishlistProduct={handleEditWishList}

      />
    </div>
  );
}

export default Wishlist;
