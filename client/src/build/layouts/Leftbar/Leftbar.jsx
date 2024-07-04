import { useSelector } from "react-redux";
import Logo from "./Logo";
import { Typography } from "@mui/material";
const Leftbar = () => {
  const user = useSelector((appState) => appState.user);
  return (

<>
<Logo ></Logo>
{user && <Typography sx={{fontFamily:"cursive"}} variant="h5" color="white">hello:{user?.name?.first} {user?.name?.last}</Typography>}
</>
  );
};
export default Leftbar;
