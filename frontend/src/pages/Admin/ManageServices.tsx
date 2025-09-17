import type { FunctionComponent } from "react";
import AdminDashboard from "./AdminDashboard";

interface ManageServicesProps {
  
}
 
const ManageServices: FunctionComponent<ManageServicesProps> = () => {
  return (<AdminDashboard>Manage Services</AdminDashboard>);
}
 
export default ManageServices;