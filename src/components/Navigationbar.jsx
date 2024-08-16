import React, {useEffect, useState} from 'react'
import './Navigationbar.css'
import logo from "../assets/logo.jpeg"
import config from '../config';
// import Authopopup from "../Authopopup/Authopopup";
import { Link } from "react-router-dom";
import Login from "./../adminauth/login/Login"
import Home from "./Home"
const Navigationbar = ({isadminauthenticated,setisadminauthenticated}) => {
    
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const checkAdminAuthenticated = async () => {
      console.log('response-pragya12');
      try {
        console.log('response-pragya');
          const response = await fetch(`${process.env.API_BASE_URL}/admin/checklogin`, {
            // `${config.API_BASE_URL}/admin/checklogin`
              method: 'GET',
              headers: {
                  'Content-Type' : 'application/json',
              },
              credentials: 'include'
          });
          console.log('response', response);
          if (response.ok) {
              //Admin is authenticated
              setisadminauthenticated(true);
          }
          else {
              //Admin is not authenticated
              setisadminauthenticated(false);
          }
      }
      catch (err) {
          console.error(err);
          setisadminauthenticated(false);
      }
  }

  useEffect(() => {
    console.log('response-pragya11');
      checkAdminAuthenticated();
  }, []);
  const [showpopup, setShowpopup] = useState(false)
  // const { theme, toggleTheme } = useTheme(false);
  useEffect(()=>{
    console.log(isadminauthenticated)
  },[isadminauthenticated])
  const loggedIn =(x) =>{
    console.log("loggedIn",x)
    setisadminauthenticated(true)
  }
  const logout=()=>{
    console.log("logout")
    setisadminauthenticated(false)
  }
  return (
    <nav>
      <img src={logo} alt="logo" className="img"/>
      <Link to="/Home" className="a">Home</Link>
      <Link to="/signup" className="a">signup</Link>
      {/* <Link to="/login" className="a">login</Link> */}
      <Link to="/addworkout" className="a">addworkout</Link>
      <Link to="/contact" className="a">contact</Link>
      {/* <Link to="/profile" className="a"><IoIosBody/></Link> */}
      {
        console.log("iisisisisisisis",isadminauthenticated) &&
        isadminauthenticated
        ? <button className="btn" onclick={logout}>{console.log("isadminauthenticated",isadminauthenticated)}Logout</button>:
        <button onClick={() => {
          setShowpopup(true)
        }}>Login</button>
      }
      {
        showpopup&& <Login setShowpopup={setShowpopup} loggedIn={loggedIn}/>
        // <h1 className="mainhead1">Login page</h1>
      }
      
            {/* <Appp/> */}

      
        {/* <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button> */}
      
      
    </nav>
  )
//   return (
//     <div className="navbar">Navigationbar
//       <img src = {logo} alt = "Logo" width = {100} className = 'logo' />
//         <div className='adminlinks'>
//             {isadminauthenticated ?(
//                 <>
//                     <a href = "/pages/addworkout">Add Workout</a>
//                 </>
//             ) : (
//                 <>
//                     {/* Show login/signup links for unauthenticated admin */}
//                     <a href = "/adminauth/login">Login</a>
//                     <a href = "/adminauth/register">Signup</a>
//                 </>
//             )}
//         </div>
//     </div>
//   )
}

export default Navigationbar