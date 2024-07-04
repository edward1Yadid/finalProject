import { createSlice } from "@reduxjs/toolkit";

function setSearch(currentState, action) {
  return action.payload;
}
  

  const searchSlice=createSlice({
    name:"search",
    initialState:"",
    reducers:{setSearch}
  })


  
  export const searchActionCreator=searchSlice.actions
  export const searchReducerContainer=searchSlice.reducer