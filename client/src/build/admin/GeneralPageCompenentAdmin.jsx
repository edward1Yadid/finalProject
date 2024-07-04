import { Box, Typography } from '@mui/material'
import React from 'react'

function GeneralPageCompenentAdmin({title,subtitle}) {
  return (
    <>

    <Box 
    pt={2}
    px={2}
    pb={4}

    sx={{
      backgroundColor: '#F4F4F4',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      maxWidth: '100vw',
      margin: 'auto',
      display:"flex",
      flexDirection:"row",
      justifyContent:"center"
    }}
  >
    <Typography 
      variant='h3' 
      component="h1"
      sx={{
        fontWeight: '300',
        color: '#666',
        fontFamily: 'Roboto, sans-serif',
        marginTop: '16px'
      }}
    >
      {title}
    </Typography>
    <Typography  
      variant='h3' 
      component="h2"
      sx={{
        fontWeight: '300',
        color: '#666',
        fontFamily: 'Roboto, sans-serif',
        marginTop: '16px'
      }}
    >
      {subtitle}
    </Typography>
  </Box>
</>
  )
}

export default GeneralPageCompenentAdmin
