import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

function Model({model}) {
  const {name,Origin,Height, Description , image} = model;

return (
<Box>
<Card sx={{ width: "350px",height:"20%", borderRadius: "20px"}}>
  <CardHeader title={name} />
  <CardMedia
    component={"img"}
    height="auto"
    image={image?.url}
    alt={image?.alt}
   
  />
  <CardContent sx={{ padding: "16px" }}>
    <Typography m={1} textAlign={"left"} variant="h5" component="h2" color="textSecondary">
    Origin: {Origin}
    </Typography>
    <Typography m={1}  textAlign={"left"}  variant="h5" color="textSecondary">
      height: {Height}
    </Typography>
    <Typography m={1} variant="h5" color="textSecondary"  align="justify">
   {Description}
    </Typography>
  </CardContent>
</Card>
</Box>
);
}

export default Model;
