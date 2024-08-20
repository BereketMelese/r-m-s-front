import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./Components/Shared/hooks/auth-hook";
import "./App.css";
import { AuthContext } from "./Components/Shared/Components/Context/Auth-context";
import MainNavigation from "./Components/Shared/Components/Navigation/MainNavigation";

const UsersAuth = React.lazy(() => import("./Components/User/Pages/Auth"));
const AdminsAuth = React.lazy(() => import("./Components/Admin/Pages/Auth"));
const ChefsAuth = React.lazy(() => import("./Components/Chef/Pages/Auth"));

function App() {
  const { token, login, logout, userId, role } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route
          path="/auth"
          element={!token ? <UsersAuth /> : <Navigate to="/" />}
        />
        <Route
          path="/Aauth"
          element={!token ? <AdminsAuth /> : <Navigate to="/" />}
        />
        <Route
          path="/Cauth"
          element={!token ? <ChefsAuth /> : <Navigate to="/" />}
        />
        {/* Other protected routes */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<UsersAuth />} />
        <Route path="/Aauth" element={<AdminsAuth />} />
        <Route path="/Cauth" element={<ChefsAuth />} />
        {/* Other public routes */}
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
