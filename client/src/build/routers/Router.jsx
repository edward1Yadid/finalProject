import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigateToComponents from "./navigatetoPages";
import LoginUser from "../users/pages/LoginUser";
import RgisterUser from "../users/pages/RgisterUser";
import MensClothing from "../admin/categories/MensClothing";
import WomensClothing from "../admin/categories/WomensClothing.jsx";
import KidsClothing from "../admin/categories/KidsClothing";
import ErrorPage from "../services/ErrorPage";
import HomePage from "../users/pages/HomePage";
import Footwear from "../admin/categories/Footwear.jsx";
import CRM from "../admin/CRM/CRM.jsx";
import CreateProduct from "../../build/admin/products/pages/CreateProduct";
import EditProduct from "../../build/admin/products/pages/EditProduct";
import ShoppingCart from "../admin/Cart/page/ShoppingCart.jsx";
import ProductInfo from "../admin/products/pages/ProductInfo.jsx";
import Wishlist from "../admin/wishlist/Wishlist.jsx";
import FavoriteProductByUser from "../admin/favoriteProduct/FavoriteProductByUser.jsx";
import ManageOrders from "../admin/CRM/dashboard/orders/pages/ManageOrders.jsx";
import MgangeQuantity from "../admin/products/pages/MgangeQuantity.jsx";
import About from "../users/pages/About.jsx";
import OurModels from "../components/OurModels.jsx";



function Router() {
  return (
    <Routes>
      <Route
        path={NavigateToComponents.HomePage}
        element={<HomePage />}
      ></Route>

<Route
        path={NavigateToComponents.About}
        element={<About />}
      ></Route>
<Route
        path={NavigateToComponents.OurModels}
        element={<OurModels />}
      ></Route>


      {/*
users
*/}
      <Route
        path={NavigateToComponents.LoginPage}
        element={<LoginUser />}
      ></Route>
      <Route
        path={NavigateToComponents.SignUp}
        element={<RgisterUser />}
      ></Route>

      <Route path={NavigateToComponents.FOOTWAER} element={<Footwear />}>
  
    
      </Route>

      <Route path={NavigateToComponents.wishlist} element={<Wishlist />} />
      <Route
        path={NavigateToComponents.FavoriteProfuctPage}
        element={<FavoriteProductByUser />}
      />
      <Route
        path={NavigateToComponents.MEN_CLOTHING}
        element={<MensClothing />}
      />
      <Route
        path={NavigateToComponents.WOMEN_CLOTHING}
        element={<WomensClothing />}
      />

      <Route
        path={NavigateToComponents.KIDS_CLOTHING}
        element={<KidsClothing />}
      ></Route>

      {/*
admin
*/}

      <Route
        path={NavigateToComponents.CRM_DASHBOARD}
        element={<CRM />}
      ></Route>
      <Route
        path={NavigateToComponents.CREATE_Profuct}
        element={<CreateProduct />}
      ></Route>
      <Route
        path={`${NavigateToComponents.EDIT_Profuct}/:id`}
        element={<EditProduct />}
      ></Route>
      <Route
        path={`${NavigateToComponents.Product_deatils}/:id`}
        element={<ProductInfo />}
      ></Route>
      <Route
        path={NavigateToComponents.Manageorders}
        element={<ManageOrders />}
      ></Route>
      <Route
        path={NavigateToComponents.MANAGEQIANTITY}
        element={<MgangeQuantity />}
      ></Route>



      {/*
cart
*/}

      <Route
        path={`${NavigateToComponents.CART}/:id`}
        element={<ShoppingCart />}
      ></Route>

      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
  );
}

export default Router;
