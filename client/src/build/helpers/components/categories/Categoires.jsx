import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Category from "./Category";

function categoires({ categories }) {
  if (!categories.length) {
    return (
      <Typography variant="h4" color="initial">
        No caterories found
      </Typography>
    );
  }
  return (
    <Container>
      <Stack
        spacing={1}
        gap={4}
        direction="row"
        m={10}
        flexWrap="wrap"
        justifyContent="center"
        alignItems={"center"}
      >
        {categories &&
          categories.map((category, index) => {
            return <Category category={category} key={index}></Category>;
          })}
      </Stack>
    </Container>
  );
}

export default categoires;
