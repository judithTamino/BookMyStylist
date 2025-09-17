import type { FunctionComponent } from "react";
import AdminLayout from "../../layout/AdminLayout";

interface AdminDashboardProps {
  
}
 
const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
  return (<AdminLayout>Admin Dashboard</AdminLayout>);
}
 
export default AdminDashboard;