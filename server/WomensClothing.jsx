import React, { useEffect, useState } from "react";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers"
import NavigateToComponents from "../../routers/navigatetoPages";
import GeneralPageCompenent from "../../services/GeneralPageComponent";
import { useSelector } from "react-redux";
function WoClothing() {
  const search = useSelector((appState) => appState.search);
  const { value:{error,Isloading},handleGetAllProductsFiltered}=useFetchProduct()
const CategoryName=NavigateToComponents.WOMEN_CLOTHING
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {

        let products = await handleGetAllProductsFiltered(CategoryName);
        setProducts(products);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, [CategoryName]);
  return (
<>
<GeneralPageCompenent title={"Welcome to FashionFusion: Where Fabulous Finds Meet Fun Fashion"} subtitle={"Because Life's Too Short to Wear Boring Clothes!"}/>
<ExpirienceCustomers Isloading={Isloading} error={error} products={Products} /></>
  )
}

export default WoClothing;
