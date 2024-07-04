import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../../routers/navigatetoPages";

function ProductHead({ prodct }) {
  const navigate=useNavigate()
  const {image}=prodct
  const { alt, url } = image;


  return (
<>
<CardActionArea onClick={()=>navigate(`${NavigateToComponents.Product_deatils}/${prodct._id}`)} >
<CardMedia
      component={"img"}
      height="auto"
      image={url}
      alt={alt}
    ></CardMedia>
</CardActionArea>

  
</>
  );
}

export default ProductHead;
