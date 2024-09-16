import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const auth = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleFoodMenu = () => {
    setIsFoodOpen((prev) => !prev);
  };

  const toggleCategoryMenu = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <header className={styles.topbar}>
        <div className={styles.logoBox}>
          <a href="/dashboard" className={styles.logo}>
            <img src="assets/images/logo-dark.png" alt="Logo" height="20" />
          </a>
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            <i
              className={`fa ${
                isOpen ? "fa-chevron-left" : "fa-chevron-right"
              }`}
            ></i>
          </button>
        </div>
      </header>

      <nav className={styles.sidebarMenu}>
        <ul>
          <li>
            <a
              href="#functions"
              className={styles.subMenu}
              style={{ color: "#b0b0b0" }}
            >
              <i className="fa fa-cogs" style={{ paddingRight: "1rem" }}></i>{" "}
              {isOpen && "Functions"}
            </a>
            <ul
              id="functions"
              className={`${styles.subMenu} ${
                isOpen ? styles.show : styles.hide
              }`}
            >
              <li>
                <NavLink
                  to="/dashboard"
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-tachometer-alt"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  {isOpen && "Dashboard"}
                </NavLink>
              </li>
              <li>
                <Link
                  onClick={toggleFoodMenu}
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-utensils"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  {isOpen && "Foods"}
                </Link>
                <ul
                  className={`${styles.subMenu} ${
                    isFoodOpen ? styles.show : styles.hide
                  }`}
                >
                  <li>
                    <NavLink
                      to="/FoodDashboard"
                      className={styles.subMenuLinks}
                    >
                      Foods
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Addfood" className={styles.subMenuLinks}>
                      Add Food
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  onClick={toggleCategoryMenu}
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-tags"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  {isOpen && "Category"}
                </Link>
                <ul
                  className={`${styles.subMenu} ${
                    isCategoryOpen ? styles.show : styles.hide
                  }`}
                >
                  <li>
                    <NavLink to="/Categories" className={styles.subMenuLinks}>
                      Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Addcategory" className={styles.subMenuLinks}>
                      Add Category
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/Order"
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-shopping-cart"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Sales"
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-chart-line"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Addtable"
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-table"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  Add Table
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Settings"
                  className={styles.subMenuLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-cog"
                    style={{ marginRight: ".5rem", color: "#b0b0b0" }}
                  ></i>{" "}
                  Settings
                </NavLink>
              </li>
              <li>
                <button
                  onClick={auth.logout}
                  className="btn btn-outline-custom pe-5"
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
