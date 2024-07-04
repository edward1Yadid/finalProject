import { Box } from "@mui/material";
import ButtonComponentAdmin from "../component/ButtonComponentAdmin";

import { ManageItmes } from "../component/ManageItmes";

function AdminNav() {
  const ManageItme = ManageItmes;

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#C5C9A4",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {ManageItme.map((item, index) => (
      
          <ButtonComponentAdmin {...item} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default AdminNav;
