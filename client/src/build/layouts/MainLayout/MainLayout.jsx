import { Container } from "@mui/material";
import { node } from "prop-types";
import React, { useEffect } from "react";
import { authActionCreator } from "../../redux/AuthSlice";
import { appStore } from "../../redux/Store";
import {  useNavigate } from "react-router-dom";
import NavigateToComponents from "../../routers/navigatetoPages";
import { useTheme } from "../../Providers/ThemeProvider";

function MainLayout({ children }) {
  const navigate=useNavigate()
  useEffect(() => {
    let logoutTimer;

    function resetLogoutTimer() {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, 14400000);
    }

    function logout() {
      localStorage.removeItem("token");
      window.location.reload();
      appStore.dispatch(authActionCreator.logout());
      navigate(NavigateToComponents.HomePage)
    
    }

    window.onload = resetLogoutTimer;
    document.onmousemove = resetLogoutTimer;
    document.onscroll = resetLogoutTimer;
    document.onclick = resetLogoutTimer;

  }, []);

  const {isDark}=useTheme()
  return (
    <Container
      maxWidth="100%"
      sx={{ minHeight: "100vh" ,backgroundColor: isDark? "#45454B": "e3f2fd" }}
    >
      {children}
    </Container>
  );
}
MainLayout.propTypes = {
  children: node.isRequired,
};

export default MainLayout;
