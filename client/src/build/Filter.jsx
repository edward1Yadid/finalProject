import { Box, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import initialFilterProduct from "./services/axios/carts/initialFilterProduct/initialFilterProduct";
import { filterProductByUserjoivalidation } from "./admin/products/services/joischema/filterProductByUserjoivalidation";
function Filter() {
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
  return (
<Box sx={{display:"flex",flexDirection:"row",gap:2,alignItems:"flex-start", pl:5}}>
<Box>
  <InputLabel id="Subcategory-label">Subcategory</InputLabel>
  <Select 
    sx={{ width: "20em" }}id="subcategory"label="Subcategory"{...register("subcategory")}defaultValue="Pants">
    {["Tshirt", "Pants", "Shoes"].map((subcategory, index) => ( 
      <MenuItem key={index} value={subcategory}       label={subcategory}>
        {subcategory}
      </MenuItem>
    ))}
  </Select>
  {errors.Subcategory && (<Typography color="error">{errors?.Subcategory.message}</Typography> )}
</Box>
<Box>
  <InputLabel id="Color-label">Color</InputLabel>
  <Select 
    sx={{ width: "20em" }}id="Color" label="Color"{...register("Color")} defaultValue="Pants">
    {["Gray","Yellow",   "White","Black","BlueLight","Pink","Blue",].map((color, index) => ( <MenuItem key={index} value={color} label={color}>{color}</MenuItem>
    ))}
  </Select>
  {errors.Color && (<Typography color="error">{errors?.Color.message}</Typography> )}
</Box>
<Box>
<FormControl component="fieldset">
<FormLabel  component="legend" >  Price Range     </FormLabel>
<div style={{ display: "flex", alignItems: "center" }}>
<TextField {...register("minPrice")} type="text" label="Min Price" error={!!errors.minPrice} helperText={errors.minPrice?.message}/>
<span style={{ margin: "0 10px" }} />
<TextField {...register("maxPrice")} type="text" label="Max Price" error={!!errors.maxPrice} helperText={errors?.maxPrice?.message}/> 
 </div>
 </FormControl>
</Box>
                                       
               
                    
                      
                      
                        
                        
                        
                        
                        
                      
                    
                  















</Box>
  );
}

export default Filter;
