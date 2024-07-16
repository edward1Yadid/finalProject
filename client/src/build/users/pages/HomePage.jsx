import React, { useEffect, useState } from "react";
import ExpirienceCustomers from "../../services/ExpirienceCustomers";
import "./homepage.css";
import { useForm } from "react-hook-form";
import { ImFilter } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Card, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import useFetchProduct from "../../services/hooks/useFetchProduct";
import FormComponentTitle from "../../helpers/components/FormComponentTitle";
import initialFilterProduct from "../../services/axios/carts/initialFilterProduct/initialFilterProduct";
import { filterProductByUserjoivalidation } from "../../admin/products/services/joischema/filterProductByUserjoivalidation";
import { filterProductsUser } from "../../services/axios/Produtcs/productApiAxios";
import GeneralPageCompenent from "../../services/GeneralPageComponent";
import { useSelector } from "react-redux";

function HomePage() {
  const search = useSelector((appState) => appState.search);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: initialFilterProduct,
    mode: "onChange",
    resolver: joiResolver(filterProductByUserjoivalidation),
  });

  const onSubmit = async (filterProduct) => {
    try {
      const filter = await filterProductsUser(filterProduct);
      setProduct(filter);
    } catch (error) {
      console.error("Error occurred while filtering products:", error);
      return { error: error.message };
    }
  };

  const { handleGetAllProducts, value: { error, Isloading } } = useFetchProduct();
  const [productsall, setProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await handleGetAllProducts();
        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const onreset = async () => {
    try {
      const products = await handleGetAllProducts();
      setProduct(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProuct = async () => {
    const products = await handleGetAllProducts();
    setProduct(products);
  };

  return (
    <>
      <GeneralPageCompenent
        title={"Welcome to FashionFusion"}
        subtitle={
          "Where Style Meets Innovation - Discover Your Unique Fashion Identity"
        }
      />
      <div className="grid-container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card>
              <FormComponentTitle
                title={"Refine Dashboard View"}
                subtitle={"Select your preferences to filter the data presented in your dashboard"}/>
              <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ padding: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="color-label" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                        Color
                      </InputLabel>
                      <Select labelId="color-label" id="color" {...register("Color")} label="Color" error={!!errors.Color} defaultValue={"Blue"} required>
                        {["Gray", "Yellow", "White", "Black", "BlueLight", "Pink", "Blue"].map((color) => (
                          <MenuItem key={color} value={color}>
                            {color}
                          </MenuItem>
                        ))}
                        
                      </Select>
                      {errors.Color && (
                        <Typography color="error">
                          {errors?.Color.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        {...register("Category")}
                        label="Category"
                        error={!!errors.Category}
                        defaultValue={"Womens-Clothing"}
                      >
                        {["Mens-Clothing", "Womens-Clothing", "Footwear", "Kids-Clothing"].map((Category) => (
                          <MenuItem key={Category} value={Category}>
                            {Category}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.Category && (
                        <Typography color="error">
                          {errors?.Category.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="subcategory-label">Subcategory</InputLabel>
                      <Select   labelId="subcategory-label" id="subcategory" {...register("Subcategory")} label="Subcategory" error={!!errors.Subcategory} defaultValue={"Shose"}>

                        {["Tshirt", "Pants", "Shose"].map((Subcategory) => (
                          <MenuItem key={Subcategory} value={Subcategory}>
                            {Subcategory}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.Subcategory && (
                        <Typography color="error">
                          {errors?.Subcategory.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          {...register("minPrice")}
                          type="text"
                          label="Min Price"
                          error={!!errors.minPrice}
                          helperText={errors.minPrice?.message}
                        />
                        <span style={{ margin: "0 5px" }} />
                        <TextField required {...register("maxPrice")} type="text" label="Max Price" error={!!errors.maxPrice} helperText={errors?.maxPrice?.message} />
                      </div>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={2} mt={2}>
                  <Grid item>
                    <IconButton
                      type="submit"
                      disabled={!isDirty || !isValid}
                      sx={{ color: isValid ? "green" : "red" }}
                    >
                      <ImFilter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => reset(onreset)}>
                      <GrPowerReset />
                    </IconButton>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <ExpirienceCustomers
              deleteProduct={handleDeleteProuct}
              Isloading={Isloading}
              error={error}
              products={
                productsall &&
                productsall.filter((p) =>
                  p.title.toLowerCase().includes(search.toLowerCase())
                )
              }
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default HomePage;
