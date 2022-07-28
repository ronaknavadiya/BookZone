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
import logo from "../../images/bookzonelogo.png";
import { useAppContext } from "../../context/appContext";
import styled from 'styled-components';
const Navbar = () => {
  const { logout , user } = useAppContext();

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
      {user && (
        <Nav>
          <NavLink to="/">
            <Logowrapper>
            {/* <img src={logo} alt="logo" /> */}
            <img src={logo} alt="logo" />
            </Logowrapper>
           
          </NavLink>
          <Bars />
          <NavMenu>
            <NavLink to="/profile" activestyle="true">
              My Profile
            </NavLink>
            {/* <NavLink to="/login" activestyle="true">
              Log In
            </NavLink>
            <NavLink to="/signup" activestyle="true">
              Sign Up
            </NavLink> */}
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/login" onClick={logout}>
              Log Out
            </NavBtnLink>
          </NavBtn>
        </Nav>
      )}
    </>
  );
};
const Logowrapper=styled.div`
width:60px;
height:60px;
img{
  width:100%;
  height:100%;
  object-fit: cover;
}
`
export default Navbar;
