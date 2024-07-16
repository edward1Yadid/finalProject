import { Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import Model from  "./Model"

function Models({models}) {

  if (!models || models?.length === 0) {
    return (
      <Typography variant="h4" color="initial">
        No Models found
      </Typography>
      
    );}


  return (
<Grid container spacing={2} pt={2} gap={4}>
  {models?.map((model, index) => (
    <Grid   key={index}>
      <Model model={model} />
    </Grid>
  ))}
</Grid>



  )
}

export default Models
