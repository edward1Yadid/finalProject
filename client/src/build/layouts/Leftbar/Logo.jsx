import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import  NavigateToComponents from "../../routers/navigatetoPages";

const Logo = () => {
    const imageUrl ="./assets/images/E-commerce website.jpeg"
  return (
    <Link
      to={NavigateToComponents.HomePage}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <IconButton size="medium" edge="start" color="inherit" aria-label="menu">
      <img src={imageUrl} alt="Logo" style={{ width: '100px', height: '60px', marginRight: '8px',borderRadius:"20%" }} />
      </IconButton>
    </Link>
  );
};

export default Logo;
