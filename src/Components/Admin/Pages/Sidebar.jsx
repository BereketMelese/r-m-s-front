import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const auth = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
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
            <a href="#functions" className={styles.menuLink}>
              <i className="fa fa-cogs"></i> {isOpen && "Functions"}
            </a>
            <ul id="functions" className={`${styles.subMenu} ${styles.show}`}>
              <li>
                <NavLink to="/dashboard" className={styles.subMenuLink}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/FoodDashboard" className={styles.subMenuLink}>
                  Foods
                </NavLink>
              </li>
              <li>
                <NavLink to="/Categories" className={styles.subMenuLink}>
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/Addfood" className={styles.subMenuLink}>
                  Add Food
                </NavLink>
              </li>
              <li>
                <NavLink to="/Addcategory" className={styles.subMenuLink}>
                  Add Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/Order" className={styles.subMenuLink}>
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/Sales" className={styles.subMenuLink}>
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink to="/Addtable" className={styles.subMenuLink}>
                  Add Table
                </NavLink>
              </li>
              <li>
                <NavLink to="/Settings" className={styles.subMenuLink}>
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
