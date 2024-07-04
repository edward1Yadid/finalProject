import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./sidebarstyle.css";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdSpaceDashboard,MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import NavigateToComponents from "../../../routers/navigatetoPages";


function SideBar() {
  const navigate=useNavigate()


  return (
    <>

        <Sidebar
   style={{
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "50vh",
   
    backgroundColor: "black",
  }}
         className="sidebar-display"
        >
          
          <Menu >
            <MenuItem icon={<MdSpaceDashboard />}>Dashboard</MenuItem>
            <SubMenu label="Products" icon={<MdOutlineProductionQuantityLimits />}>
              <MenuItem onClick={()=>navigate(NavigateToComponents.CREATE_Profuct)}>Create Product</MenuItem>
            </SubMenu> 
        
            <SubMenu label="orders" icon={<FaUsers />}>
              <MenuItem onClick={()=>navigate(NavigateToComponents.Manageorders)}>List of orders</MenuItem>
            </SubMenu>
            <SubMenu label="Reports" icon={<TbReportSearch  />}></SubMenu>
            <SubMenu label="Settings" icon={<IoSettingsOutline />}>
              <MenuItem>Log out</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
    
    </>
  );
}



export default SideBar;
