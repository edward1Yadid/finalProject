import React, { useEffect } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import MainLayout from "./MainLayout/MainLayout";
import FoterWeb from "./components/fotter/FoterWeb";
import { jwtDecode } from "jwt-decode";
import { appStore } from "../redux/Store";
import { authActionCreator } from "../redux/AuthSlice";



function Layout({ children }) {

  useEffect( ()=>{
    const token=localStorage.getItem("token")
    if(token){
      const loggedinUser=jwtDecode(token)
      appStore.dispatch(authActionCreator.login(loggedinUser))

    }
  },[])
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <MainLayout>{children}</MainLayout>

      <FoterWeb />
    </Box>
    
  );
}

export default Layout;
