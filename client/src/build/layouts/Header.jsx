import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MenuBar from "../layouts/Menu/MenuBar";
import Leftbar from "./Leftbar/Leftbar";
import NavigateToComponents from "../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Rightbar from "./Rightbar/Rightbar";
import UserNotLogged from "./Menu/UserNotLogged";
import UserLogged from "./Menu/UserLogged";

function ResponsiveAppBar() {
  const user = useSelector((appState) => appState.user);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = [
    { text: "Mens-Clothing", path: `${NavigateToComponents.MEN_CLOTHING}` },
    { text: "Womens-Clothing", path: `${NavigateToComponents.WOMEN_CLOTHING}` }, { text: "Kids-Clothing", path: `${NavigateToComponents.KIDS_CLOTHING}` }, 
    { text: "Footwear", path: `${NavigateToComponents.FOOTWAER}` }, { text: "WishList", path: `${NavigateToComponents.wishlist}` }, 
    { text: "Favorite Product", path: `${NavigateToComponents.FavoriteProfuctPage}` }, 
    { text: "Shopping Cart", path: `${NavigateToComponents.CART}/${user?._id}` }
  ];
  

  return (
    <AppBar position="sticky">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Leftbar />
          <Rightbar />
          <Box sx={{ display: { xs: "flex", md: "none" }, flexWrap: "wrap" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuItems?.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    navigate(menuItem.path);
                  }}
                >
                  <Typography textAlign="center">{menuItem.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MenuBar />
          <Box>
            <UserNotLogged />
            <UserLogged/>
          </Box>
 
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
