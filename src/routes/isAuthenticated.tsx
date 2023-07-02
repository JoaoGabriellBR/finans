/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = () => !!Cookies.get("finans-authtoken");

interface AuthenticatedRouteProps {
  component: ComponentType<any>;
  [key: string]: any;
}

const AuthenticatedRoute = ({
  component: Component,
  ...props
}: AuthenticatedRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated()) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <Component {...props} />;
};

export default AuthenticatedRoute;
