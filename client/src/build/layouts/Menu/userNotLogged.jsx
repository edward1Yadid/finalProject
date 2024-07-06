import { Avatar, Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react'
import NavigateToComponents from '../../routers/navigatetoPages';

function userNotLogged() {
  const settingsUser = [{text:"About",path:`${NavigateToComponents.About}`}, {text:"favorite",path:`${NavigateToComponents.FavoriteProfuctPage}`}, {text:"Wishlist",path:`${NavigateToComponents.wishlist}`}, {text:"Logout"}];
  return (
<Box >
<Tooltip title="Open settings">
  <IconButton onClick={handleOpenUserMenu} >
    <Avatar alt="Remy Sharp" src="./static/images/avatar/2.jpg" />
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
{user?.isAdmin ? (
settingsAdmin.map((setting, index) => (
<MenuItem
key={index}
onClick={() => {
handleCloseUserMenu(setting);
navigate(setting.path);
}}
>
<Typography>{setting.text}</Typography>
</MenuItem>
))
) : (
settingsUser.map((setting, index) => (
<MenuItem
key={index}
onClick={() => {
handleCloseUserMenu(setting);
navigate(setting.path);
}}
>
<Typography>{setting.text}</Typography>
</MenuItem>
))
)}
</Menu>
</Box>
  )
}

export default userNotLogged
