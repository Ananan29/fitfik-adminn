import { useState } from "react"
import "./App.css"
import Navigationbar from "./components/Navigationbar";
import {ToastContainer,toast} from "react-toastify"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Signup from './adminauth/register/Signup';
import Login from './adminauth/login/Login';
import Addworkoutpage from './pages/addworkout/page';
// import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from "./components/Contact/Contact"
import Home from "./components/Home"
function App() {

  const [isadminauthenticated, setisadminauthenticated] = useState(false)
  return (
    <div className="maindiv">
      {/* <div className="navdiv"> */}
    {/* // <Navigationbar/>
    // </div> */}
    vhjhgvjb
    <BrowserRouter>
      <Navigationbar isadminauthenticated={isadminauthenticated} setisadminauthenticated={setisadminauthenticated}/>
        <div className="restdiv">
      <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/addworkout" element={<Addworkoutpage/>} />
          <Route path="/contact" element={<Contact/>} />

      </Routes>
      </div>
      {/* <Router> */}
      
      {/* <Routes>
        <Route path="/" element={<>
          <Homebanner1/>
      <Homebanner2/>
      </>}/>
      
        <Route path="/workout/:type" element={<Page/>}/>
      </Routes> */}
      <ToastContainer/>
    {/* </Router> */}
    </BrowserRouter>
    </div>
  )
}

export default App
