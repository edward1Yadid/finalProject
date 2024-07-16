import {
    Avatar,
    Box,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    IconButton,
  } from "@mui/material";
  import React from "react";
  import NavigateToComponents from "../../routers/navigatetoPages";
  import { authActionCreator } from "../../redux/AuthSlice";
  import { appStore } from "../../redux/Store";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';

function UserLogged() {
    const user = useSelector((appState) => appState.user);
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = (setting) => {
      setAnchorElUser(null);
      if (setting.text === "Logout") {

        navigate(NavigateToComponents.HomePage);
        window.location.reload()
        appStore.dispatch(authActionCreator.logout());
        localStorage.removeItem("token");
      } else if (setting.path) {
        navigate(setting.path);
      }
    };
  
    const settingsUser = [{text:"About",path:`${NavigateToComponents.About}`}, {text:"favorite",path:`${NavigateToComponents.FavoriteProfuctPage}`}, {text:"Wishlist",path:`${NavigateToComponents.wishlist}`}, {text:"Logout"}];
    const settingsAdmin = [ {text:"About",path:`${NavigateToComponents.About}`},{text:"Dashboard",path:`${NavigateToComponents.CRM_DASHBOARD}`}, {text:"Orders",path:`${NavigateToComponents.Manageorders}`}, {text:"Products",path:`${NavigateToComponents.MANAGEQIANTITY}`}, {text:"Logout"}];
    return (
    (user && (
      <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
        <Avatar alt="me" src="./assets/images/avatar.png" sx={{ display: { xs: "none", md: "flex" } }}> </Avatar>
          <LinearScaleOutlinedIcon sx={{display: { xs: "flex", md: "none" },mr:1}} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        { (user?.isAdmin ? settingsAdmin: settingsUser)?.map((setting, index) => (
          <MenuItem key={index} onClick={() => handleCloseUserMenu(setting)}>
            <Typography>{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
    ))
    );
}

export default UserLogged
