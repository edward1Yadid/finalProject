import React, { useEffect, useState } from "react";
import NavItems from "../components/navItem";
import NavigateToComponents from "../../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import useFetchCarts from "../../services/hooks/useFetchCarts";
import { appStore } from "../../redux/Store";
import { quantityActionCreator } from "../../redux/QuantitySlice";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import "../header.css"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from "../../Providers/ThemeProvider";
function MenuBar() {
  const {isDark,toggleDarkMode}=useTheme()
  const user = useSelector((appState) => appState.user);
  const quantity = useSelector((appState) => appState.quantity);
  const navigate = useNavigate();
  const { handleGetCartByUser } = useFetchCarts();
  const { handleGetAllProducts } = useFetchProduct();
  const [products, setProducts] = useState(null);

  const [cartsQuantity, setCartsQuantity] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        let cartsFromData = await handleGetCartByUser(user?._id);
        if (cartsFromData) {
          const totalQuantity = cartsFromData.reduce((acc, item) => {
            const quantity = item.quantity;
            return acc + quantity;
          }, 0);
          appStore.dispatch(quantityActionCreator.setQuantity(totalQuantity));
          setCartsQuantity(totalQuantity);
        } else {
          setCartsQuantity(null);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }

    fetchData();
  }, [cartsQuantity, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await handleGetAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const menuItems = [
    { text: "Mens-Clothing", path: `${NavigateToComponents.MEN_CLOTHING}` },
    { text: "Womens-Clothing", path: `${NavigateToComponents.WOMEN_CLOTHING}` },
    { text: "Kids-Clothing", path: `${NavigateToComponents.KIDS_CLOTHING}` },
    { text: "Footwear", path: `${NavigateToComponents.FOOTWAER}` },
    { text: "WishList", path: `${NavigateToComponents.wishlist}` },
    {
      text: "Favorite Product",
      path: `${NavigateToComponents.FavoriteProfuctPage}`,
    },
    {
      text: "Shopping Cart",
      path: `${NavigateToComponents.CART}/${user?._id}`,
    },
  ];
  return (
    <>
      <Box
        sx={{
          flexGrow:1,
          display: { sm: "none", md: "flex" },
          justifyContent: "center",
      
        }}

        className={"buttonDisplay"}
      >
        {menuItems?.map((item, index) => (
          <NavItems key={index} handleMenuClick={() => navigate(item.path)}>
            <Typography variant="body1" color={"white"}>
              {item.text}
            </Typography>
          </NavItems>
        ))}
        {quantity >= 0 && (
          <Typography
            variant="h6"

          >
            {quantity}
          </Typography>
        )}
        <IconButton

        >
          <LocalMallIcon />
        </IconButton>
      </Box>
      {user?.isAdmin && (
        <NavItems
          handleMenuClick={() => navigate(NavigateToComponents.CRM_DASHBOARD)}
        >
          <Typography variant="body2" color="white">
            CRM
          </Typography>
        </NavItems>
      )}

      
      <IconButton  onClick={toggleDarkMode}>

{isDark ? <LightModeIcon/> : <DarkModeIcon/>}
</IconButton>

    </>
  );
}

export default MenuBar;
