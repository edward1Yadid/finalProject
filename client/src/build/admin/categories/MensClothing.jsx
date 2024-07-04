import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers";
import NavigateToComponents from "../../routers/navigatetoPages";
import GeneralPageCompenent from "../../services/GeneralPageComponent";

function MensClothing() {
  const search = useSelector((appState) => appState.search);
  const {
    value: { error, Isloading },
    handleGetAllProductsFiltered,
  } = useFetchProduct();
  const CategoryName = NavigateToComponents.MEN_CLOTHING;
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let products = await handleGetAllProductsFiltered(CategoryName);
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products", error);
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
      <GeneralPageCompenent
        title={"Welcome to FashionFusion Men's Collection"}
        subtitle={
          "Unleash Your Inner Style - Premium Fashion for the Modern Man"
        }
      />
      <ExpirienceCustomers
        deleteProduct={handleDeleteProuct}
        Isloading={Isloading}
        error={error}
        products={
          Products &&
          Products.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
          )
        }
      />
    </>
  );
}

export default MensClothing;
