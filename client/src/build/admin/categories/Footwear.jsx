import React, { useEffect, useState } from "react";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers"
import NavigateToComponents from "../../routers/navigatetoPages";
import GeneralPageCompenent from "../../services/GeneralPageComponent";
import { useSelector } from "react-redux";

function Footwear() {
  const search = useSelector((appState) => appState.search);
  const { value:{error,Isloading},handleGetAllProductsFiltered}=useFetchProduct()
const CategoryName=NavigateToComponents.FOOTWAER
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

  const handleDeleteProuct = async () => {
    let products = await handleGetAllProductsFiltered(CategoryName);
    setProducts(products);
  };

  return (
<>
<GeneralPageCompenent title={"Step Into Style with FashionFusion"} subtitle={"Where Every Step Sparks Joy and Confidence"}/>
<ExpirienceCustomers  deleteProduct={handleDeleteProuct} Isloading={Isloading} error={error} products={Products && Products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))} />
</>
  )
}

export default Footwear;
