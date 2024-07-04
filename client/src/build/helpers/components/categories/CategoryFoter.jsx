import { Box, Button } from "@mui/material"
import "./CategoryStyle.css"
import { func } from "prop-types"


function CategoryFoter({menclick,womenclick}) {

const style={
  backgroundColor: "#66C3FF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  margin: "5px",
  width:"40%"
}
  return (
<Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

<Button sx={style} onClick={menclick}>men</Button>
<Button sx={style} onClick={womenclick}>women</Button>
</Box>



  )
}
CategoryFoter.prototypes={
  menclick:func.isRequired,
  womenclick:func.isRequired,
}
export default CategoryFoter
