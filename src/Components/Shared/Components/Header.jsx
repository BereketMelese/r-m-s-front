import React from "react";
// import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      {/* Navbar & Hero Start */}
      <div className="container-xxl position-relative p-0">
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              {props.title}
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="#">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  {props.page}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}
    </div>
  );
};

export default Header;
