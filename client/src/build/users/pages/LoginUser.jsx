import { Button, Card, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import initialLogin from "../services/initialdataservicesform/initialLogin";
import { schemaLogin } from "../services/joiSchema/loginschemavalidation";
import FormComponentTitle from "../../helpers/components/FormComponentTitle";
import { loginApi } from "../../services/axios/users/userApiAxios";
import NavigateToComponents from "../../routers/navigatetoPages";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { appStore } from "../../redux/Store";
import { authActionCreator } from "../../redux/AuthSlice";
function LoginUser() {

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: initialLogin,
    mode: "onChange",
    resolver: joiResolver(schemaLogin),
  });
  function handleReset() {
    reset();
  }

  const onSubmit = async (data) => {
    try {
      let userFromAPI = await loginApi(data);

      localStorage.setItem("token", userFromAPI);
      let userdecode = jwtDecode(userFromAPI);
      console.log(userdecode);
      appStore.dispatch(authActionCreator.login(userdecode));
          navigate(NavigateToComponents.HomePage)
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Grid style={{ padding: "80px 5px 0 5px" }}>
      <Card style={{ maxWidth: 500, margin: "0 auto" }}>
        <FormComponentTitle
          title={"Login to Access Your Account"}
          subtitle={"Join Us to Explore Exclusive Deals"}
        />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
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
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  Login
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

export default LoginUser;
