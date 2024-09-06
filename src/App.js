import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./Components/Shared/hooks/auth-hook";
import "./App.css";
import { AuthContext } from "./Components/Shared/Components/Context/Auth-context";
import NavLinks from "./Components/Shared/Components/Navigation/NavLinks.js";

const UsersAuth = React.lazy(() => import("./Components/User/Pages/Auth"));
const AdminsAuth = React.lazy(() => import("./Components/Admin/Pages/Auth"));
const ChefsAuth = React.lazy(() => import("./Components/Chef/Pages/Auth"));
const AddCategory = React.lazy(() =>
  import("./Components/Admin/Pages/AddCategory")
);
const AddFood = React.lazy(() => import("./Components/Admin/Pages/AddFood"));
const Food = React.lazy(() => import("./Components/Food/FoodPage"));
const Home = React.lazy(() => import("./Components/Food/Home"));
const Category = React.lazy(() =>
  import("./Components/Admin/Pages/Categories")
);
const AddTable = React.lazy(() =>
  import("./Components/Admin/Pages/CreateTable")
);
const Orders = React.lazy(() => import("./Components/Admin/Pages/Order"));
const Sales = React.lazy(() => import("./Components/Admin/Pages/SalesPage"));
const Setting = React.lazy(() =>
  import("./Components/Admin/Pages/Settings.js")
);
const About = React.lazy(() => import("./Components/Shared/pages/About.jsx"));
const Contact = React.lazy(() =>
  import("./Components/Shared/pages/Contact.jsx")
);
const Service = React.lazy(() =>
  import("./Components/Shared/pages/Service.jsx")
);

function App() {
  const { token, login, logout, userId, role } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/AddFood" element={<AddFood />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/category" element={<Category />} />
        <Route path="/AddTable" element={<AddTable />} />
        <Route path="/Order" element={<Orders />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<UsersAuth />} />
        <Route path="/Aauth" element={<AdminsAuth />} />
        <Route path="/Cauth" element={<ChefsAuth />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavLinks />
        <main>
          <Suspense>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
