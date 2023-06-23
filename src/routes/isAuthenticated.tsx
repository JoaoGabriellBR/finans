import Cookies from "js-cookie";

const isAuthenticated = () => Cookies.get("authtoken");

export default isAuthenticated;
