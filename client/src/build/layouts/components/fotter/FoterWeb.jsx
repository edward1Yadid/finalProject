import { AppBar, BottomNavigation, BottomNavigationAction,Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../../routers/navigatetoPages";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function FoterWeb() {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ position: "sticky", bottom: 0, left: 0, right: 0,opacity:"0.8" ,display:"flex",alignItems:"center"}}>
      <Toolbar>
        <BottomNavigation sx={{backgroundColor:"inherit"}}>
          <BottomNavigationAction
            label="About"
            icon={<InfoIcon />}
            onClick={() => navigate(NavigateToComponents.HomePage)}
          />
        </BottomNavigation>
        <BottomNavigation sx={{backgroundColor:"inherit"}}>
          <BottomNavigationAction
            label="Facebook"
            icon={<FacebookIcon />}
            onClick={() => window.open("https://www.facebook.com", "_blank")}
          />
        </BottomNavigation>
        <BottomNavigation sx={{backgroundColor:"inherit"}}>
          <BottomNavigationAction
            label="Twitter"
            icon={<TwitterIcon />}
            onClick={() => window.open("https://twitter.com", "_blank")}
          />
        </BottomNavigation>
        <BottomNavigation sx={{backgroundColor:"inherit"}}>
          <BottomNavigationAction
            label="Instagram"
            icon={<InstagramIcon />}
            onClick={() => window.open("https://www.instagram.com", "_blank")}
          />
        </BottomNavigation>
        <BottomNavigation sx={{backgroundColor:"inherit"}}>
          <BottomNavigationAction
            label="LinkedIn"
            icon={<LinkedInIcon />}
            onClick={() => window.open("https://www.linkedin.com", "_blank")}
          />
        </BottomNavigation>
        <BottomNavigation sx={{backgroundColor:"inherit"}}>
          <BottomNavigationAction
            label="Connect Us"
            icon={<EmailIcon />}
            onClick={() => navigate(NavigateToComponents.ContactPage)}
          />
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  );
}

export default FoterWeb;
