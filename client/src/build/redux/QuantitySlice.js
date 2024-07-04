import { createSlice } from "@reduxjs/toolkit";

function setQuantity(currentState, action) {
  return action.payload;
}
  

  const quantitySlice=createSlice({
    name:"quantity",
    initialState:0,
    reducers:{setQuantity}
  })


  
  export const quantityActionCreator=quantitySlice.actions
  export const quantityReducerContainer=quantitySlice.reducer