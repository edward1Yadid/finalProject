import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuBar from "../layouts/Menu/MenuBar";
import Leftbar from "./Leftbar/Leftbar";
import NavigateToComponents from "../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import { appStore } from "../redux/Store";
import { authActionCreator } from "../redux/AuthSlice";
import { useSelector } from "react-redux";
import Rightbar from "./Rightbar/Rightbar";





function ResponsiveAppBar() {
  const user = useSelector((appState) => appState.user);
const userAdmin= user?.isAdmin
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting.text === "Logout") {

      appStore.dispatch(authActionCreator.logout());
      localStorage.removeItem("token");
      navigate(NavigateToComponents.HomePage)
    }
  };

  const settingsAdmin = [{text:"Dashboard", path:`${NavigateToComponents.CRM_DASHBOARD}`}, {text:"Orders", path:`${NavigateToComponents.Manageorders}`}, {text:"Products",path:`${NavigateToComponents.MANAGEQIANTITY}` },{text:"Logout"}];
  const settingsUser = [{text:"About",path:`${NavigateToComponents.About}`}, {text:"favorite",path:`${NavigateToComponents.FavoriteProfuctPage}`}, {text:"Wishlist",path:`${NavigateToComponents.wishlist}`}, {text:"Logout"}];
  const menuItems = [
    { text: "Mens-Clothing", path: `${NavigateToComponents.MEN_CLOTHING}` },
    { text: "Womens-Clothing", path: `${NavigateToComponents.WOMEN_CLOTHING}` },
    { text: "Kids-Clothing", path: `${NavigateToComponents.KIDS_CLOTHING}` },
    { text: "Footwear", path: `${NavigateToComponents.FOOTWAER}` },
    { text: "WishList", path: `${NavigateToComponents.wishlist}` },
    {text: "Favorite Product",path: `${NavigateToComponents.FavoriteProfuctPage}`},
    {text: "Shopping Cart",path: `${NavigateToComponents.CART}/${user?._id}`} ];
  return (
    <AppBar position="sticky" >
      <Container maxWidth="xxl" >
        <Toolbar disableGutters>
          
          <Leftbar />
        
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } ,flexWrap:"wrap"}}>
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
              {menuItems.map((menuItem, index) => (
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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
          {userAdmin && settingsAdmin.map((setting,index) => (
  <MenuItem
    key={index}
    onClick={() => {
      handleCloseUserMenu(setting);
      navigate(setting.path);
    
      
      
    }}
  >
    <Typography>{setting.text}</Typography>
  </MenuItem>
))}
          {!userAdmin && settingsUser.map((setting,index) => (
  <MenuItem
    key={index}
    onClick={() => {
      handleCloseUserMenu(setting);
      navigate(setting.path);
    
      
      
    }}
  >
    <Typography>{setting.text}</Typography>
  </MenuItem>
))}



            </Menu>
          </Box>
<Rightbar/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
