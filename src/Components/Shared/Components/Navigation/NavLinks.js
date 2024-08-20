import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../Context/Auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          FOODS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/category`}>CATEGORY</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.role === "true" && (
        <li>
          <NavLink to={`/AddFood`}>ADD FOOD</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.role === "true" && (
        <li>
          <NavLink to={`/AddCategory`}>ADD CATEGORY</NavLink>
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
