import React, { useCallback, useEffect } from "react";
import ExpirienceCustomers from "../../services/ExpirienceCustomers";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../routers/navigatetoPages";
import GeneralPageCompenent from "../../services/GeneralPageComponent";
function FavoriteProductByUser() {
  const navigate = useNavigate();
  const {
    value: { error, Isloading, products, product },
    handleGetFavoriteproduct,
  } = useFetchProduct();

  useEffect(() => {
    handleGetFavoriteproduct();


  }, []);

  const handleFavoriteProduct = async () => {
    await handleGetFavoriteproduct();
  };

  return (
    <div>
   
      <GeneralPageCompenent
        title={"Discover Your FashionFusion Favorites"}
        subtitle={"Where Style Meets Preference - Explore Your Top Picks"}
      />
      <ExpirienceCustomers
        Isloading={Isloading}
        error={error}
        products={products}
        favoriteProduct={handleFavoriteProduct}
      />
    </div>
  );
}

export default FavoriteProductByUser;
