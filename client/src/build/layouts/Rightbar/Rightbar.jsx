import React from "react";
import { searchActionCreator } from "../../redux/SearchSlice";
import { appStore } from "../../redux/Store";
import { TextField } from "@mui/material";

function Rightbar() {


  return (
<>
<TextField
      sx={{width:"150px",margin:"20px",borderRadius:"20px", border:"unset", color:"black",}}
        id="search"
        label="Search"
        onChange={(event) => {
          appStore.dispatch(searchActionCreator.setSearch(event.target.value));
        }}
      />


</>
  );
}

export default Rightbar;
