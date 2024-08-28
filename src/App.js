import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./Components/Shared/hooks/auth-hook";
import "./App.css";
import { AuthContext } from "./Components/Shared/Components/Context/Auth-context";
import MainNavigation from "./Components/Shared/Components/Navigation/MainNavigation";

const UsersAuth = React.lazy(() => import("./Components/User/Pages/Auth"));
const AdminsAuth = React.lazy(() => import("./Components/Admin/Pages/Auth"));
const ChefsAuth = React.lazy(() => import("./Components/Chef/Pages/Auth"));
const AddCategory = React.lazy(() =>
  import("./Components/Admin/Pages/AddCategory")
);
const AddFood = React.lazy(() => import("./Components/Admin/Pages/AddFood"));
const Food = React.lazy(() => import("./Components/Food/FoodPage"));
const Category = React.lazy(() =>
  import("./Components/Admin/Pages/Categories")
);
const AddTable = React.lazy(() =>
  import("./Components/Admin/Pages/CreateTable")
);
const Orders = React.lazy(() => import("./Components/Admin/Pages/Order"));
const Sales = React.lazy(() => import("./Components/Admin/Pages/SalesPage"));

function App() {
  const { token, login, logout, userId, role } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/AddFood" element={<AddFood />} />
        <Route path="/" element={<Food />} />
        <Route path="/category" element={<Category />} />
        <Route path="/AddTable" element={<AddTable />} />
        <Route path="/Order" element={<Orders />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="*" element={<Food />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<UsersAuth />} />
        <Route path="/Aauth" element={<AdminsAuth />} />
        <Route path="/Cauth" element={<ChefsAuth />} />
        <Route path="/" element={<Food />} />
        <Route path="*" element={<Food />} />
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
        <MainNavigation />
        <main>
          <Suspense>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
