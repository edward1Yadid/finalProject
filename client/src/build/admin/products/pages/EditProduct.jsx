import {
  Button,
  Card,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormComponentTitle from "../../../helpers/components/FormComponentTitle";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import NavigateToComponents from "../../../routers/navigatetoPages";
import useFetchProduct from "../../../services/hooks/useFetchProduct";
import { productValidationSchemaEdit } from "../services/joischema/editProductvalidation";

function EditProduct() {
  const {id:ProductID}=useParams()

  const {handlegetProductDetails,handleUpdateProduct}=useFetchProduct()
  const navigate = useNavigate();
  const [initialProductData, setInitialProductData] = useState("");
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: initialProductData,
    mode: "onChange",
    resolver: joiResolver(productValidationSchemaEdit),
  });
  useEffect(() => {
    const fetchData = async () => {
      const productDetails = await handlegetProductDetails(ProductID);
      setInitialProductData(productDetails)
      setValue('title', productDetails?.title);
      setValue('description', productDetails?.description);
      setValue('price', productDetails?.price);
      setValue('color', productDetails?.color);
      setValue('discount', productDetails?.discount);
    };
    fetchData();
  }, [ProductID, setValue]);

  const handleReset = async () => {
    reset(initialProductData);
    const productDetails = await handlegetProductDetails(ProductID);
    setValue('title', productDetails?.title);
    setValue('description', productDetails?.description);
    setValue('price', productDetails?.price);
    setValue('color', productDetails?.color);
    setValue('discount', productDetails?.discount);
  };
  const handleupdateproduct = async (data) => {
 
    await handleUpdateProduct(ProductID,data)
    navigate(NavigateToComponents.HomePage)

  };
  return (
    <Grid style={{ padding: "80px 5px 0 5px" }}>
      <Card style={{ maxWidth: 500, margin: "0 auto" }}>
        <FormComponentTitle
          title={"Edit Product"}
          subtitle={
            "Update the details below to edit the product in your catalog"
          }
        ></FormComponentTitle>
        <form onSubmit={handleSubmit(handleupdateproduct)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <InputLabel id="Title">Title</InputLabel>
              <TextField
                name="Title"
                type="text"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Title"
   
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <InputLabel id="Color">Color</InputLabel>
              <TextField
                name="Color"
                type="text"
                {...register("color")}
                error={!!errors.color}
                helperText={errors.color?.message}

         
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <InputLabel id="Price">Price</InputLabel>
              <TextField
                name="Price"
                type="text"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
         
     
              />
            </Grid>
            <Grid item xs={12} sm={6} >
            <InputLabel id="Discount">Discount</InputLabel>
              <TextField
                name="Discount"
                type="text"
                {...register("discount")}
                error={!!errors.discount}
                helperText={errors.discount?.message}
 
         

              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="Description">Description</InputLabel>
              <TextField
                name="Description"
                type="text"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
         
                multiline
                rows={2}
    
              />
            </Grid>
    
  
            <Grid container spacing={2} m={2}>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1976d2",
                    '&:hover': {
                      backgroundColor: "#115293",
                    },
                  }}
                  disabled={!isDirty && isValid}
                >
                  Update Product
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
  );
}

export default EditProduct;
