import React, { useEffect, useState } from "react";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers"
import NavigateToComponents from "../../routers/navigatetoPages";
import GeneralPageCompenent from "../../services/GeneralPageComponent";
import { useSelector } from "react-redux";

function KidsClothing() {
  const search = useSelector((appState) => appState.search);
  const { value:{error,Isloading},handleGetAllProductsFiltered}=useFetchProduct()
const CategoryName=NavigateToComponents.KIDS_CLOTHING
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
<GeneralPageCompenent title={"The Little Fashionistas of FashionFusion"} subtitle={"Where Playful Styles Spark Joy and Creativity"}/>
<ExpirienceCustomers  deleteProduct={handleDeleteProuct} Isloading={Isloading} error={error} products={Products && Products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))} />
</>
  )
}

export default KidsClothing;

