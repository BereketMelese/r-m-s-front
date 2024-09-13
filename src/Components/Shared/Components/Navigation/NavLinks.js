import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AuthContext } from "../Context/Auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
      <NavLink to="/" className="navbar-brand ps-5">
        <h1 className="text-primary m-1">
          <i className="fa fa-utensils me-3"></i>Bite & Bliss
        </h1>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0 pe-4">
          {!(auth.isLoggedIn && auth.role === "admin") && (
            <NavLink
              to="/"
              className={`nav-item nav-link ${isActive("/") ? "active" : ""}`}
            >
              HOME
            </NavLink>
          )}
          {/* <NavLink
            to="/"
            className={`nav-item nav-link ${isActive("/") ? "active" : ""}`}
          >
            HOME
          </NavLink> */}
          {((auth.isLoggedIn && auth.role === "user") || !auth.isLoggedIn) && (
            <>
              <NavLink
                to="/Food"
                className={`nav-item nav-link ${
                  isActive("/Food") ? "active" : ""
                }`}
              >
                FOOD
              </NavLink>
              <NavLink
                to="/About"
                className={`nav-item nav-link ${
                  isActive("/About") ? "active" : ""
                }`}
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/Service"
                className={`nav-item nav-link ${
                  isActive("/Service") ? "active" : ""
                }`}
              >
                SERVICE
              </NavLink>
              <NavLink
                to="/Contact"
                className={`nav-item nav-link ${
                  isActive("/Contact") ? "active" : ""
                }`}
              >
                CONTACT
              </NavLink>
            </>
          )}
          {auth.isLoggedIn && auth.role === "admin" && (
            <>
              <NavLink
                to="/category"
                className={`nav-item nav-link ${
                  isActive("/category") ? "active" : ""
                }`}
              >
                CATEGORY
              </NavLink>

              <NavLink
                to="/AddFood"
                className={`nav-item nav-link ${
                  isActive("/AddFood") ? "active" : ""
                }`}
              >
                ADD FOOD
              </NavLink>

              <NavLink
                to="/DashBoard"
                className={`nav-item nav-link ${
                  isActive("/DashBoard") ? "active" : ""
                }`}
              >
                DashBoard
              </NavLink>

              <NavLink
                to="/AddTable"
                className={`nav-item nav-link ${
                  isActive("/AddTable") ? "active" : ""
                }`}
              >
                ADD TABLE
              </NavLink>

              <NavLink
                to="/AddCategory"
                className={`nav-item nav-link ${
                  isActive("/AddCategory") ? "active" : ""
                }`}
              >
                ADD CATEGORY
              </NavLink>

              <NavLink
                to="/sales"
                className={`nav-item nav-link ${
                  isActive("/sales") ? "active" : ""
                }`}
              >
                SALES
              </NavLink>

              <NavLink
                to="/settings"
                className={`nav-item nav-link ${
                  isActive("/settings") ? "active" : ""
                }`}
              >
                SETTING
              </NavLink>
            </>
          )}
          {auth.isLoggedIn &&
            (auth.role === "admin" || auth.role === "chef") && (
              <NavLink
                to="/Order"
                className={`nav-item nav-link ${
                  isActive("/Order") ? "active" : ""
                }`}
              >
                ORDERS
              </NavLink>
            )}
          {!auth.isLoggedIn && (
            <NavLink
              to="/auth"
              className={`nav-item nav-link pe-5 ${
                isActive("/auth") ? "active" : ""
              }`}
            >
              LOGIN
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <button
              onClick={auth.logout}
              className="btn btn-outline-custom pe-5"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
