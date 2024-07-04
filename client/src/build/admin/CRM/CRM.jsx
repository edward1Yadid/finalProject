
import AdminNav from "./dashboard/AdminNav";
import GeneralPageCompenentAdmin from "../GeneralPageCompenentAdmin";

import { useEffect, useState } from "react";
import useFetchProduct from "../../services/hooks/useFetchProduct";
import ExpirienceCustomers from "../../services/ExpirienceCustomers";
function CRM() {

  const {
    handleGetAllProducts,
    value: { error, Isloading },
  } = useFetchProduct();
  const [productsall, setProduct] = useState(null);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const products = await handleGetAllProducts();
        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <GeneralPageCompenentAdmin title={"Welcome, Admin! here you can Manage orders, products, and more to optimize store operations and customer satisfaction."}/>
      <AdminNav/>
      
      <ExpirienceCustomers
        Isloading={Isloading}
        error={error}
        products={productsall}
      />
    </div>
  );
}

export default CRM;
