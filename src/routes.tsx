import { BrowserRouter, Routes as Rotas, Route } from "react-router-dom";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";

export default function Routes() {
  return (
    <BrowserRouter>
      <Rotas>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Rotas>
    </BrowserRouter>
  );
}
