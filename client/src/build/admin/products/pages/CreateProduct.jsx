import {
  Button,  Card,  Grid,  InputLabel, MenuItem,  Select,  TextField,} from "@mui/material";
import React, { useEffect } from "react";
import FormComponentTitle from "../../../helpers/components/FormComponentTitle";
import { useForm } from "react-hook-form";
import initialdataservicesformproduct from "../../products/services/initialschema/initialdataservicesformproduct";
import { productValidationSchema } from "../../products/services/joischema/createProductvalidation";
import { useNavigate, } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import NavigateToComponents from "../../../routers/navigatetoPages";
import useFetchProduct from "../../../services/hooks/useFetchProduct";
function CreateProduct() {
  const { handlecreateNewProduct } = useFetchProduct();

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: initialdataservicesformproduct,
    mode: 'onChange',
    resolver: joiResolver(productValidationSchema),
  });
  const handleReset = () => {
    reset();
  };

  const handleCreateProduct = async (rawProduct) => {
    await handlecreateNewProduct(rawProduct);
    navigate(NavigateToComponents.HomePage)
  };
  return (
    <Grid style={{ padding: "80px 5px 0 5px" }}>
      <Card style={{ maxWidth: 500, margin: "0 auto" }}>
        <FormComponentTitle
          title={"Create a New Product"}     subtitle={  "Fill in the details below to add a new product to your catalog"}
        ></FormComponentTitle>
        <form onSubmit={handleSubmit(handleCreateProduct)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                type="text"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Title"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                type="text"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                placeholder="Description"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                type="text"
                {...register("color")}
                error={!!errors.color}
                helperText={errors.color?.message}
                placeholder="Color"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="text"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
                placeholder="Price"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="ImageURL"
                type="text"
                {...register("url")}
                error={!!errors.url}
                helperText={errors.url?.message}
                placeholder="ImageURL"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ImageAlt"
                type="text"
                {...register("alt")}
                error={!!errors.alt}
                helperText={errors.alt?.message}
                placeholder="ImageAlt"
              />
            </Grid>
            <Grid item xs={12} sm={6} mt={1.9}>
              <TextField
                label="Discount"
                type="text"
                {...register("discount")}
                error={!!errors.discount}
                helperText={errors.discount?.message}
                placeholder="Discount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                sx={{ width: "65%" }}
                label="Gender"
                {...register("gender")}
                defaultValue="male">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="unisex">Unisex</MenuItem>
              </Select>
              
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="Category-label">Category</InputLabel>
              <Select
                sx={{ width: "65%" }}
                label="Category"
                {...register("category")}
                defaultValue="Mens-Clothing"
              >
                <MenuItem value="Mens-Clothing">Mens Clothing</MenuItem>
                <MenuItem value="Womens-Clothing">Womens Clothing</MenuItem>
                <MenuItem value="Footwear">Footwear</MenuItem>
                <MenuItem value="Kids-Clothing">Kids Clothing</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="Subcategory-label">Subcategory</InputLabel>
              <Select
                sx={{ width: "65%" }}
                id="subcategory"
                label="Subcategory"
                {...register("subcategory")}
                defaultValue="Pants"
              >
                <MenuItem value="Pants">Pants</MenuItem>
                <MenuItem value="Tshirt">Tshirt</MenuItem>
                <MenuItem value="Shose">Shose</MenuItem>
              </Select>
            </Grid>


            <Grid container spacing={2} m={2}>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isValid || !isDirty}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1976d2",
                    '&:hover': {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  Create Product
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="reset"
                  fullWidth
                  variant="outlined"
      
                  onClick={handleReset}
                  sx={{
                    fontWeight: "bold",
                    color:"GrayText"
                  }}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => navigate(NavigateToComponents.HomePage)}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  )};
export default CreateProduct;
