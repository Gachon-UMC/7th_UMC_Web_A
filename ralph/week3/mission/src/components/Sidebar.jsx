import {Link} from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";

const  Sidebar = ()=> {
  return (
    <div style={{
      marginTop:'30px',
      backgroundColor:"rgb(35,35,35)",
      display:"inline-block"
    }}>
      <div>
      <div>
        <Link style={{
          fontSize:"25px",
          margin:'10px',
          textDecoration: "none",
          color:"white"}} to='/search'><IoSearchCircleSharp />검색</Link>
      </div>
      <Link style={{
          fontSize:"25px",
          margin:'10px',
          textDecoration: "none",
          color:"white"}} to='/movie'><BiSolidCameraMovie />영화</Link>
    </div>   
  </div>    
  )
}
export default Sidebar;
