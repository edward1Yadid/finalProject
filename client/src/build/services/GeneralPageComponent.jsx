

import { string } from 'prop-types'
import { Box } from '@mui/system'

import { Typography } from "@mui/material";

function GeneralPageCompenent({title,subtitle}) {

  return (

<>

    <Box 
    pt={2}
    px={2}
    pb={4}
    sx={{
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      maxWidth: '100vw',
      margin: 'auto',
    }}
  >
    <Typography 
      variant='h3' 
      component="h1"
      sx={{
        fontWeight: 'bold',
        color:"#C9B309",
        fontFamily: 'Roboto, sans-serif'
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
        marginTop: '16px',
          color:"#C9B309"
      }}
    >
      {subtitle}
    </Typography>
  </Box>
</>
  )
}
GeneralPageCompenent.propType={
  title:string.isRequired,
  subtitle:string.isRequired
}
export default GeneralPageCompenent
