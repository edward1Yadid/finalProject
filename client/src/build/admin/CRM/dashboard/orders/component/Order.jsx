import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { changeStatusToOrder } from "../../../../../services/axios/order/orderApiAxios";
function Order({ OrderStatus,changeStatus }) {
  const { totalPrice, status, createdAt ,_id} = OrderStatus;
  const colorstatus = status === "pending" ? "red" : "green";
  const colorButton = status === "processing" ? "green" : status === "shipped" ? "green" : status === "delivered" ? "green" : "red";

  const handleUpdateStatus = async () => {
    await changeStatusToOrder(OrderStatus._id)
    await changeStatus()
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 800 }}>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6" color="initial">
                Order Management
              </Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItem
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          <Typography variant="body1" sx={{ flex: 1 }}>
            OrderDate: {createdAt}
          </Typography>
          <Typography variant="body1" sx={{ flex: 1 }}>
            Revenue: {totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ flex: 1, color: colorstatus }}>
            Status: {status}
          </Typography>
          {status !== "pending" ? (
            <IconButton
              aria-label="changeStatus"
              onClick={handleUpdateStatus}
              sx={{ color: colorButton }}
              disabled
            >
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="changeStatus"
              onClick={handleUpdateStatus}
              sx={{ color: colorButton }}
            >
              <CheckCircleIcon />
            </IconButton>
          )}
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
}

export default Order;
