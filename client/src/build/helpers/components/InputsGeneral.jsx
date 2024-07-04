import {  Grid, TextField } from "@mui/material";
import { bool, func, string } from "prop-types";

const InputsGeneral = ({
  label,
  name,
  type,
  required,
  errors,
  handleChangeFun,
  register,
}) => {
  return (
<Grid item sx={{ marginBottom: "10px" }}>
  <TextField
    autoComplete="off"
    sx={{ width: "250px" }}
    id={name}
    label={label}
    name={name}
    type={type}
    required={required}
    onChange={handleChangeFun}
    {...register(name, { required: `${label} is required` })}
    error={!!(errors && errors[name])}
    helperText={(errors && errors[name]) || ''}
  />
</Grid>

  );
};

InputsGeneral.propTypes = {
  name: string.isRequired,
  required: bool,
  variant: string.isRequired,
  type: string.isRequired,
  label: string.isRequired,
  onChange: func,
};

export default InputsGeneral;
