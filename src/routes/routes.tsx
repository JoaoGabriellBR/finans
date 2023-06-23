import {
  BrowserRouter,
  Navigate,
  Routes as Rotas,
  Route,
} from "react-router-dom";
import Home from "../screens/Home";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import MyBills from "../screens/MyBills";

import isAuthenticated from "./isAuthenticated";

export default function Routes() {
  return (
    <BrowserRouter>
      <Rotas>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/my-bills"
          element={isAuthenticated() ? <MyBills /> : <Navigate to="/login" />}
        ></Route>
      </Rotas>
    </BrowserRouter>
  );
}
