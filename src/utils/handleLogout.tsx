/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

const handleLogout = (navigate: any) => {
  Cookies.remove("finans-authtoken");
  navigate("/login");
};

export default handleLogout;
