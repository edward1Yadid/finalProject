import {
    Button,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import useFetchProduct from "../../../services/hooks/useFetchProduct";
  import NavigateToComponents from "../../../routers/navigatetoPages";
import { useSelector } from "react-redux";
  
  function ProductInfo() {
    const user = useSelector((appState) => appState.user);
    const navigate = useNavigate();
    const { handlegetProductDetails } = useFetchProduct();
    const { id: ProductID } = useParams();
    const [product, setProduct] = useState(null);
  
    const navigateToCategory = (category) => {
      switch (category) {
        case "Mens-Clothing":
          navigate(NavigateToComponents.MEN_CLOTHING);
          break;
        case "Womens-Clothing":
          navigate(NavigateToComponents.WOMEN_CLOTHING);
          break;
        case "Kids-Clothing":
          navigate(NavigateToComponents.KIDS_CLOTHING);
          break;
        case "Footwear":
          navigate(NavigateToComponents.FOOTWEAR);
          break;
        default:
          navigate(NavigateToComponents.HomePage);
          break;
      }
    };
    const {  handlewishlistUser, } = useFetchProduct();
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const productDetails = await handlegetProductDetails(ProductID);
          setProduct(productDetails);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      };
  
      fetchProductDetails();
    }, [ProductID, handlegetProductDetails]);
  
    const handleWishlist = async () => {
      if (!user) return null;
      try {

        await handlewishlistUser(user?._id, product?._id);

      } catch (error) {
        console.log(error);
      }
    };


    return (
      <Container sx={{ minHeight: "100vh", maxWidth: { xs: "100%", md: "90%", lg: "80%" } }}>
        <Grid container sx={{ pt: 5 }}>
          <Grid
            container
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <CardMedia
              component="img"
              image={product?.image?.url}
              alt={product?.image?.alt}
              sx={{
                width: { xs: "80%" },
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.9)",
              }}
            />
          </Grid>
  
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", flexDirection: "column", pt: 7, gap: 2 }}
          >
            <Grid item textAlign={"left"}>
              <Typography variant="h4" color="initial" gutterBottom>
                {product?.title}
              </Typography>
            </Grid>
  
            <Divider sx={{ borderColor: "initial", borderBottomWidth: 2, mb: 2 }} />
            <Grid item textAlign={"left"}>
              <Typography variant="h4" color="textSecondary" paragraph>
                Description: {product?.description}
              </Typography>
            </Grid>
            <Grid item textAlign={"left"}>
              <Typography variant="h6" color="initial">
                Price: ${product?.price}
              </Typography>
            </Grid>
            <Grid item textAlign={"left"}>
              <Typography variant="h6" color="initial">
                Quantity in Stock: {product?.quantity} units
              </Typography>
            </Grid>
            <Grid item textAlign={"left"}>
              <Typography variant="h6" color="initial">
                Gender: {product?.gender}
              </Typography>
            </Grid>
            <Grid item textAlign={"left"}>
              <Button variant="contained" sx={{ color: "ButtonText", maxWidth: "30%" }} onClick={handleWishlist}>
                Add to Wish list
              </Button>
              <Button
                onClick={() => navigateToCategory(product?.category)}
                variant="contained"
                sx={{ color: "ButtonText", maxWidth: "30%" }}
              >
                Back to product page
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default ProductInfo;
  