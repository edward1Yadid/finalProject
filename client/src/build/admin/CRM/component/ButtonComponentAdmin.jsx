import { Box, Button, Menu,MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function ButtonComponentAdmin({name,path1,path2,navigateName1,navigateName2}) {
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleNavigate = (path) => {
      setAnchorEl(null);
      navigate(path);
    };
  return (
<>


<Button
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        color="secondary"
        sx={{padding:2}}
      >
{name}
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <MenuItem onClick={() => handleNavigate(path1)}>{navigateName1}</MenuItem>
      <MenuItem onClick={() => handleNavigate(path2)}>{navigateName2}</MenuItem>
      </Menu>

</>
  )
}

export default ButtonComponentAdmin
