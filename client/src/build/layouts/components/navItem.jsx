
import { Button, Typography } from "@mui/material";

const NavItems = ({ handleMenuClick, children }) => {
  return (

      <Button
        edge="start"
        aria-label="menu"
        sx={{ mr: 2, color: "black" }}
        onClick={handleMenuClick}
      >
        <Typography variant="h6" component="div">
          {children}
        </Typography>
      </Button>

  );
};

export default NavItems;
