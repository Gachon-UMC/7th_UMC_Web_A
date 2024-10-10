import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./navbar.css";

const Navbar = ()=> {
  const navigate = useNavigate()
  return (
    <nav>
        <Link id="a" to={'/'} style={{ 
          textDecoration: "none", 
          fontSize:"40px",
          marginTop:"8px"}}>JUNGCHA</Link>
        <button id="button" onClick={() => navigate('/login')}>로그인</button>
        <button id="signup" onClick={() => navigate('/signup')}>회원가입</button>
    </nav>
  )
}
export default Navbar;
