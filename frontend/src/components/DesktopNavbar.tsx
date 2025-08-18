import type { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface DesktopProps {}
 
const Desktop: FunctionComponent<DesktopProps> = () => {
  return ( 
    <div className="">
      <NavLink to='/'>Home</NavLink>
    </div>
   );
}
 
export default Desktop;