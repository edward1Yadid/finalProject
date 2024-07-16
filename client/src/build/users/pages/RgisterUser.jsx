import React from "react";
import FormComponentTitle from "../../helpers/components/FormComponentTitle";
import { Button, Card, Grid, TextField } from "@mui/material";
import RegisterSchemaValidation from "../services/joiSchema/RegisterSchemaValidation";
import initialSignUpform from "../services/initialdataservicesform/initialSignUpform";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  loginApi,
  registerUser,
} from "../../services/axios/users/userApiAxios";
import normalizeUser from "../services/normalized/registerNormalizedUser";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../routers/navigatetoPages";
import { appStore } from "../../redux/Store";
import { authActionCreator } from "../../redux/AuthSlice";
function RgisterUser() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialSignUpform,
    mode: "onChange",
    resolver: joiResolver(RegisterSchemaValidation),
  });
  const handleReset = () => {
    reset();
  }; 
  const registerSubmit = async (user) => {

    let normalizeduser = await normalizeUser(user);
    const userFromData=await registerUser(normalizeduser);
    appStore.dispatch(authActionCreator.register({_id:userFromData._id,isAdmin:false,name:userFromData.name}));
    await loginApi({ email: user.email, password: user.password });
    navigate(NavigateToComponents.HomePage)
    window.location.reload()
  };
  return (
    <Grid style={{ padding: "80px 5px 0 5px" }}>
      <Card style={{ maxWidth: 500, margin: "0 auto" }}>
        <FormComponentTitle
          title={"Sign Up and Explore"}
          subtitle={"Register to Enjoy Personalized Shopping Experience"}
        ></FormComponentTitle>
        <form onSubmit={handleSubmit(registerSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                type="text"
                {...register("first")}
                error={!!errors.first}
                helperText={errors.first?.message}
                placeholder="first name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Middle name"
                type="text"
                {...register("middle")}
                error={!!errors.middle}
                helperText={errors.middle?.message}
                placeholder="middle name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                type="text"
                {...register("last")}
                error={!!errors.last}
                helperText={errors.last?.message}
                placeholder="last name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder="Email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="text"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                placeholder="Phone"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="Password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                type="text"
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message}
                placeholder="state"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                type="text"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
                placeholder="country"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street"
                type="text"
                {...register("street")}
                error={!!errors.street}
                helperText={errors.street?.message}
                placeholder="Street"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="House Number"
                type="number"
                {...register("houseNumber")}
                error={!!errors.houseNumber}
                helperText={errors.houseNumber?.message}
                placeholder="House Number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip"
                type="number"
                {...register("zip")}
                error={!!errors.zip}
                helperText={errors.zip?.message}
                placeholder="Zip"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                type="text"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
                placeholder="City"
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
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  Register
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
                    color: "GrayText",
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
export default RgisterUser;
