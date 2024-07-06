import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import Caterories from "../helpers/components/categories/Categoires";
import Orders from "../admin/CRM/dashboard/orders/component/Orders";
import Products from "../helpers/components/products/Products";
import { useSelector } from "react-redux";
import useFetchCarts from "./hooks/useFetchCarts";


const ExpirienceCustomers = ({ Isloading, categoires, error, products,wishlistProduct,OrdersStatus,favoriteProduct,deleteProduct,changeStatus }) => {
  const user = useSelector((appState) => appState.user);
const {handleGetCartByUser}=useFetchCarts()
  const [cart,setCart]=useState(null);

  useEffect(() => {
    handleGetCartByUser(user?._id)
      .then(c => {
        setCart(c);
      })
      .catch(error => {
        console.error("Error fetching cart:", error);
      });
  }, [user]);
  

  if (Isloading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error} />;

  if (categoires) {
    if (!categoires?.length)
      return <Typography>Oops... it seems there are no categories to display</Typography>;
    return <Caterories categories={categoires} />;
  }

  if (products) {
    if (!products?.length)
      return <Typography>Oops... it seems there are no products to display</Typography>;
    return <Products products={products} wishlistProduct={wishlistProduct} favoriteProduct={favoriteProduct} cart={cart} deleteProduct={deleteProduct}/>;
  }


  if (OrdersStatus) {
    if (!OrdersStatus?.length)
      return <Typography>Oops... it seems there are no orders to display</Typography>;
    return <Orders OrdersStatus={OrdersStatus} changeStatus={changeStatus} />;
  }

};

ExpirienceCustomers.propTypes = {
  Isloading: PropTypes.bool,
  categoires: PropTypes.array,
  error: PropTypes.object,
  products: PropTypes.array,
  usersSetting: PropTypes.array,
};

export default ExpirienceCustomers;
