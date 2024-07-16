import React, { useCallback, useEffect, useState } from "react";
import ExpirienceCustomers from "../../../../../services/ExpirienceCustomers";
import { getAllOrdersByAdmin } from "../../../../../services/axios/order/orderApiAxios";
import { useSelector } from "react-redux";

function ManageOrders() {
  const [OrdersStatus, setOrderStatus] = useState(null);
  const user = useSelector((appState) => appState.user);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
          const orders = await getAllOrdersByAdmin(user?._id);
          setOrderStatus(orders);
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();

  }, [user]);
const handleChangeStatus=useCallback(async ()=>{
  try {
    if (user && user?._id) {
      const orders = await getAllOrdersByAdmin(user?._id);
      setOrderStatus(orders);
    } else {
      console.error("User ID not available for fetching orders.");
    }
  } catch (error) {
    console.error(error);
  }
})
  return (
    <ExpirienceCustomers OrdersStatus={OrdersStatus} changeStatus={handleChangeStatus}></ExpirienceCustomers>
  );
}

export default ManageOrders;
