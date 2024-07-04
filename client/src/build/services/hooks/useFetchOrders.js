import { useCallback, useMemo, useState } from "react";
import { createOrderByUser, getAllOrdersByAdmin } from "../axios/order/orderApiAxios";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../routers/navigatetoPages";
import { useSnackbar } from "../../Providers/SnackBarProvider";
function useFetchOrders() {
  const snackMessage=useSnackbar()
    const navigate=useNavigate()
  const [Isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Orders, setOrders] = useState(null);
  const [Order, setOrder] = useState(null);
  const requestStatusOrders = (Order, Orders, Isloading, error) => {
    setOrder(Order);
    setOrders(Orders);
    setIsLoading(Isloading);
    setError(error);
  };

  const handleCreateOrderByUser = useCallback(async (userID) => {
    try {
      const order = await createOrderByUser(userID);
      requestStatusOrders(order, null, false, error);
      snackMessage("Order created successfully!", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      navigate(NavigateToComponents.HomePage)
      return order;
    } catch (error) {
      snackMessage("Failed to create order. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
      requestStatusOrders(null, null, false, error);
    }
  },[]);
  const handleGetOrdersByAdmin = useCallback(async (userID) => {
    try {
      const orders = await getAllOrdersByAdmin(userID);
      requestStatusOrders(null, orders, false, error);
      snackMessage("Order created successfully!", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      navigate(NavigateToComponents.HomePage)
      return orders;
    } catch (error) {
      snackMessage("Failed to create order. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
      requestStatusOrders(null, null, false, error);
    }
  },[]);

  const value = useMemo(() => {
    return { Orders, error, Isloading, Order };
  }, [Orders, error, Isloading, Order]);

  return {
    value,
    handleCreateOrderByUser,
    handleGetOrdersByAdmin
  };
}

export default useFetchOrders;
