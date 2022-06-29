import React from "react";
// import { NavLink } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavMenu,
  Bars,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import logo from "../../images/logo.png"

const Navbar = () => {
    
  return (
    // <>
    //   <Nav>
    //     <NavLink to="/">
    //       <h1>Logo</h1>
    //     </NavLink>
    //     <Bars />
    //     <NavMenu>
    //       <NavLink to="/login" activestyle="true">
    //         Login
    //       </NavLink>
    //       <NavLink to="/signup" activestyle="true">
    //         Signup
    //       </NavLink>
    //     </NavMenu>
    //     <NavBtn>
    //       <NavBarLink to="/login">Logout</NavBarLink>
    //     </NavBtn>
    //   </Nav>
    // </>
    <>
      <Nav>
        <NavLink to="/">
          {/* <img src={logo} alt="logo" /> */}
          Logo
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/profile" activestyle="true">
            My Profile
          </NavLink>
          <NavLink to="/login" activestyle="true">
            Log In
          </NavLink>
          <NavLink to="/signup" activestyle="true">
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">Log Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
