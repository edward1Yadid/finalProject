import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import useFetchProduct from "../../../services/hooks/useFetchProduct";
import UpdateIcon from "@mui/icons-material/Update";
import { UpdateQunatity } from "../../../services/axios/Produtcs/productApiAxios";
import GeneralPageCompenentAdmin from "../../GeneralPageCompenentAdmin";
function MgangeQuantity({}) {
  const { handleGetAllProducts } = useFetchProduct();
  const [productsall, setProduct] = useState([null]);
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

  const handleUpdateQunaity = async (product) => {
    await UpdateQunatity(product?._id, product?.quantity);
  };

  return (
    <>
      <GeneralPageCompenentAdmin
        title={"Hello Admin Here you can Manage your Quaintity"}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <List sx={{ listStyle: "none", padding: 0, margin: 0 }}>
          {productsall.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "wheat",
                      }}
                    >
                      <Typography variant="h5" color="initial">
                        {index + 1}. Title: {product?.title} Quantity:{" "}
                        {product?.quantity}
                      </Typography>
                      <Box sx={{ ml: "auto" }}>
                        <IconButton
                          disabled={product?.quantity > 100}
                          onClick={() => handleUpdateQunaity(product)}
                        >
                          <Typography
                            variant="body1"
                            color="initial"
                            p={1}
                            sx={{
                              color: product?.quantity > 900 ? "green" : "red",
                            }}
                          >
                            Purchase Quantity
                          </Typography>
                          <UpdateIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default MgangeQuantity;
