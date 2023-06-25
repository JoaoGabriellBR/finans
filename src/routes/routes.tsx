import { BrowserRouter, Routes as Rotas, Route } from "react-router-dom";
import Home from "../screens/Home";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import MyBills from "../screens/MyBills";

import AuthenticatedRoute from "./isAuthenticated";

export default function Routes() {
  return (
    <BrowserRouter>
      <Rotas>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={<AuthenticatedRoute component={Dashboard} />}
        />
        <Route
          path="/profile"
          element={<AuthenticatedRoute component={Profile} />}
        />
        <Route
          path="/my-bills"
          element={<AuthenticatedRoute component={MyBills} />}
        />
      </Rotas>
    </BrowserRouter>
  );
}
