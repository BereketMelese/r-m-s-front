import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../Context/Auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">FOODS</NavLink>
      </li>
      {auth.isLoggedIn && auth.role === "admin" && (
        <>
          <li>
            <NavLink to="/category">CATEGORY</NavLink>
          </li>
          <li>
            <NavLink to="/AddFood">ADD FOOD</NavLink>
          </li>
          <li>
            <NavLink to="/AddTable">ADD TABLE</NavLink>
          </li>
          <li>
            <NavLink to="/AddCategory">ADD CATEGORY</NavLink>
          </li>
          <li>
            <NavLink to="/sales">SALES</NavLink>
          </li>
          <li>
            <NavLink to="/settings">SETTING</NavLink>
          </li>
        </>
      )}
      {auth.isLoggedIn && (auth.role === "admin" || auth.role === "chef") && (
        <li>
          <NavLink to="/Order">ORDERS</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
