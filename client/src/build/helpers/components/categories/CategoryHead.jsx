import React from "react";
import { CardMedia } from "@mui/material";

function CategoryHead({ image }) {


  const { url, alt } = image;

  return (
    <CardMedia
      component={"img"}
      style={{   maxWidth: "450px"}}
      image={url}
      alt={alt}
    ></CardMedia>
  );
}

export default CategoryHead;
