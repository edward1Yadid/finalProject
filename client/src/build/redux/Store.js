import {configureStore} from "@reduxjs/toolkit"
import { authReducerContainer } from "./AuthSlice"
import { quantityReducerContainer } from "./QuantitySlice"
import { searchReducerContainer } from "./SearchSlice"

export const appStore=configureStore({
reducer:{
user:authReducerContainer,
quantity:quantityReducerContainer,
search:searchReducerContainer
}

})