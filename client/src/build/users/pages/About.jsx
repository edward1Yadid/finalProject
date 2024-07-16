
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../routers/navigatetoPages";

function About() {
const navigate=useNavigate()

  return (

    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={6} width={"100vw"}>
            <Card>
              <CardContent>
                <Typography variant="h2" gutterBottom>
                  Welcome to Our Website
                </Typography>
                <Typography textAlign={"left"} variant="h6" paragraph>
                  Our mission is to provide the best services and products to
                  our customers. We believe in quality, integrity, and customer
                  satisfaction. Our team is dedicated to ensuring that every
                  interaction you have with us is positive and productive.
                </Typography>
                <Typography textAlign={"left"} variant="h6" paragraph>
                  Founded in 2024, our company has grown from a small startup
                  to a leader in the industry. We are committed to innovation
                  and excellence, continually striving to improve our offerings
                  and meet the evolving needs of our customers.
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent >
                <Typography textAlign={"left"} variant="h5" gutterBottom>
                  About Us
                </Typography>
                <Typography textAlign={"left"} variant="h6" paragraph>
                  At our core, we are passionate about what we do. Our team
                  comprises experts from various fields, all working together to
                  deliver exceptional value. We believe that our success is
                  measured by the satisfaction of our customers and the positive
                  impact we make on the community.
                </Typography>
                <Typography textAlign={"left"} variant="h6" paragraph>
                Our services range from sales of various products worldwide. We pride ourselves on tailoring our solutions to meet each client's unique needs. Whether you are looking for a specific product or service, we have the expertise and resources to help you achieve your goals. Additionally, we distribute products globally, emphasizing sustainability through recycling.
                </Typography>
                <Typography textAlign={"left"} variant="h6" paragraph>
                  Thank you for visiting our website. We look forward to the
                  opportunity to serve you and help you succeed.
                </Typography>
              </CardContent>
            </Card> 

          </Grid>
          <Grid item md={6} sx={{ padding: 3 }}>
          <Card>
 
<CardActionArea onClick={()=>navigate(NavigateToComponents.OurModels)}>

<CardActions>
              <CardContent >
                <Typography textAlign={"left"} variant="h5" gutterBottom>
                  About Our Workers
                </Typography>
                <Typography textAlign={"left"} variant="h6" paragraph>
                Our company's models embody strong ideals, emphasizing harmony, and altruism. They actively engage in helping others and promoting a supportive environment. Their dedication to environmental consciousness is evident in their efforts to uphold sustainability principles, ensuring their activities contribute positively to a healthy environment.
                </Typography>

              </CardContent>
</CardActions>
</CardActionArea>
            </Card> 
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default About;
