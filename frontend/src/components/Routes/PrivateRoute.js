import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Base_URL from "../../config/Config";
import Spinner from "react-spinner-material";
import * as Cookies from "es-cookie";

export default function PrivateRoute() {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Added loading state

  return (
    <>
      {Cookies.get("token") ? (
        <Outlet />
      ) : (
        <Navigate
          to="/userlogin"
          replace
          state={{ prevUrl: location.pathname }}
        />
      )}
    </>
  );
}
