import { createSlice } from "@reduxjs/toolkit";

function register(currentState, action) {
  return action.payload;
}
function login(currentState, action) {
    return action.payload;
  }

  function logout(currentState, action) {
    return null
  }
  

  const authSlice=createSlice({
    name:"auth",
    initialState:null,
    reducers:{register,login,logout}
  })


  
  export const authActionCreator=authSlice.actions
  export const authReducerContainer=authSlice.reducer