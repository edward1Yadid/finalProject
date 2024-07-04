import { Box, CardContent, Typography } from "@mui/material";
import React from "react";

function CategoryBody({ category }) { 
  const { name } = category;
  return (
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          mt:1
          
        }}
      >
        <Typography variant="body2" color="black" fontSize={"2rem"}>
         {name}
        </Typography>
      </Box>
    </CardContent>
  );
}

export default CategoryBody;
