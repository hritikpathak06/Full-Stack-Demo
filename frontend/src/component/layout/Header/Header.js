import React from 'react'
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.avif"
import "./Header.css"
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <>
    <div className="header">
      <div className="leftHeader">
       <img src={logo} alt="logo" />
      </div>
      <div className="rightHeader">
        <NavLink to="/search" className="header_section">
         search
        </NavLink>
        <NavLink to={"/"} className="header_section">
        Home
        </NavLink>
        <NavLink to={"/products"} className="header_section">
        Product
        </NavLink>
        <NavLink to={"/contact"} className="header_section">
        Contact
        </NavLink>
        <NavLink to={"/about"} className="header_section">
        About
        </NavLink>
        <NavLink to={"/login"} className="header_section">
        Login
        </NavLink>
        <NavLink to={"/cart"} className="header_section">
        Cart
        </NavLink>
      </div>
    </div>
    </>
  )
}

export default Header

