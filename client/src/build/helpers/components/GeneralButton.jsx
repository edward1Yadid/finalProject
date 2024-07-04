import React from "react";
import ButtomComponent from "./ButtomComponent";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { func, string } from "prop-types";
function GeneralButton({ handleReset, handleSubmit, to }) {
  const navigate = useNavigate();
  const styles = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <Grid container spacing={1} mt={2}>
      <Grid item xs={6} sx={styles}>
        <ButtomComponent
          node="cancel"
          color="error"
          component="div"
          variant="contained"
          sx={{
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
          }}
          onClick={() => navigate(to)}
        ></ButtomComponent>
      </Grid>
      <Grid item xs={6} sx={styles}>
        <ButtomComponent
          node={<LoopIcon />}
          component="div"
          onReset={() => handleReset()}
          variant="contained"
          sx={{
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        ></ButtomComponent>
      </Grid>
      <Grid item xs={12} sx={styles}>
        <ButtomComponent
          type={"submit"}
          node="submit"
          onSubmit={(e)=> {
            debugger
            e.preventDefault();
            handleSubmit();}}
          size="large"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        ></ButtomComponent>
      </Grid>
    </Grid>
  );
}

GeneralButton.propTypes = {
  handleSubmit: func.isRequired,
  handleReset: func.isRequired,
  onChange: func,
  to: string,
  onclick: func,
};

export default GeneralButton;
