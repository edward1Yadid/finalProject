import { CardContent, Typography } from "@mui/material";
import React from "react";

function FormComponentTitle({title,subtitle}) {
  return (
    <CardContent>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {subtitle}
      </Typography>
    </CardContent>
  );
}

export default FormComponentTitle;
