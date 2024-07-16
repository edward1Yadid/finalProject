import React, { useEffect } from "react";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers";

import GeneralPageCompenent from "../../services/GeneralPageComponent";
function Wishlist() {
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
