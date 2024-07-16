import React from 'react'
import Order from './Order.jsx';
import { Grid, Typography } from '@mui/material';
import GeneralPageCompenentAdmin from '../../../../GeneralPageCompenentAdmin.jsx';

function Orders({OrdersStatus,changeStatus}) {
  const totalRevenue = OrdersStatus.reduce((acc, order) => acc + order.totalPrice, 0);
  const maxSale = OrdersStatus.reduce((max, order) => (order.totalPrice > max ? order.totalPrice : max), 0);
  const pendingOrdersCount = OrdersStatus.filter(order => order.status === "pending").length;
  const processingOrdersCount = OrdersStatus.filter(order => order.status === "processing").length;
  const shippedOrdersCount = OrdersStatus.filter(order => order.status === "shipped").length;
  const deliveredOrdersCount = OrdersStatus.filter(order => order.status === "delivered").length;

  

  return (

<>
<GeneralPageCompenentAdmin
  title={"Comprehensive Order Details"}
  subtitle={"Current Status of All Customer Orders"}
/>
    <Grid container spacing={2} m={1} >
      
    <Grid item xs={6} sm={6} sx={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
  <Typography variant="h3" color="initial" gutterBottom         fontFamily={"monospace"}>
    Total Revenue: ${totalRevenue.toFixed(1)}
  </Typography>
  <Typography variant="h3" color="initial" gutterBottom fontFamily={"monospace"}>
    Max Revenue for an Order: ${maxSale.toFixed(1)}
  </Typography>
  <Typography variant="h3" color="initial" gutterBottom fontFamily={"monospace"}>
    Orders Pending Approval: {pendingOrdersCount}
  </Typography>
  <Typography variant="h3" color="initial" gutterBottom fontFamily={"monospace"}>
    Orders Processing: {processingOrdersCount}
  </Typography>
  <Typography variant="h3" color="initial" gutterBottom fontFamily={"monospace"}>
    Orders Shipped: {shippedOrdersCount}
  </Typography>
  <Typography variant="h3" color="initial" gutterBottom fontFamily={"monospace"}>
    Orders Delivered: {deliveredOrdersCount}
  </Typography>
</Grid>

      <Grid  item xs={6}   >
        {OrdersStatus &&
          OrdersStatus?.map((OrderStatus, index) => (
            <Grid item xs={6} sm={12} key={index}>
              <Order OrderStatus={OrderStatus} changeStatus={changeStatus} />
            </Grid>
          ))}
      </Grid>
    </Grid>
</>
  );
}

export default Orders
