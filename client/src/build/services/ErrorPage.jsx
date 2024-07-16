import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import NavigateToComponents from '../routers/navigatetoPages'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate=useNavigate()
  return (
    <>
    <Container >
         <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" color="initial">
                        Sorry, this page does not exist.
                    </Typography>
                    <Button variant="text" color="primary" onClick={()=>navigate(NavigateToComponents.HomePage)}>
                        Go back to homepage
                    </Button>
                </Grid>
                <Grid item xs={12} md={4} justifyContent="center">
                    <img src="./assets/images/E-commerce website.jpeg" alt="ErrorPicture" width="100%"
                    
    
                    />
                </Grid>
            </Grid>
    </Container>


    </>
  )
}

export default ErrorPage
