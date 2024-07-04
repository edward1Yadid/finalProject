import { Button, Card, CardActionArea } from "@mui/material";
import React from "react";
import "./CategoryStyle.css";
import CategoryBody from "./CategoryBody";
import CategoryHead from "./CategoryHead";
import CategoryFoter from "./CategoryFoter";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../../routers/navigatetoPages";

function Category({ category }) {
  const navigate = useNavigate();
  const style = {
    backgroundColor: "#66C3FF",
    color: "black",
    border: "none",
    borderRadius: "5px",
    margin: "5px",
    width: "95%",
  };
  const { image, name } = category;
  return (
    <Card className="category-card">
      <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
        <CategoryHead image={image}></CategoryHead>
      </CardActionArea>
      <CategoryBody category={category}></CategoryBody>
      {(() => {
        switch (name) {
          case "Mens-Clothing":
            return (
              <Button
                sx={style}
                style={{ backgroundColor: "#363732" }}
                onClick={() =>
                  navigate(NavigateToComponents.MEN_CLOTHING)
                }
              >
                Men
              </Button>
            );
          case "Womens-Clothing":
            return (
              <Button
                sx={style}
                style={{ backgroundColor: "#D4AFB9" }}
                onClick={() =>
                  navigate(NavigateToComponents.WOMEN_CLOTHING)
                }
              >
                Women
              </Button>
            );
          case "Kids-Clothing":
            return (
              <Button
                sx={style}
                style={{ backgroundColor: "#658E90" }}
                onClick={() =>
                  navigate(NavigateToComponents.KIDS_CLOTHING)
                }
              >
                Kids
              </Button>
            );
          case "Footwear":
            return (
              <CategoryFoter
                menclick={() => navigate(NavigateToComponents.FOOTWAER)}
                womenclick={() => navigate(NavigateToComponents.FOOTWAER)}
              ></CategoryFoter>
            );

          default:
            return <CategoryFoter></CategoryFoter>;
        }
      })()}
    </Card>
  );
}

export default Category;
