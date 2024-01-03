import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute() {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = JSON.parse(localStorage.getItem("auth"))?.email;
        const enu = JSON.parse(localStorage.getItem("auth"))?.enum;
        const jwt = JSON.parse(localStorage.getItem("auth"))?.token;
        const res = await axios.post(
          "https://complaint-box-backend-v2.onrender.com/tokenmatch",
          {
            jwt,
            email,
            enu,
          }
        );

        if (res.data.success === false) {
          setAuth({ ...auth, check: false });
        }
      } catch (err) {
        setAuth({ ...auth, check: false });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const LoadingComponent = () => {
    return <div className="loading">Loading...</div>;
  };

  if (loading) {
    // Display a loading component while data is being fetched
    return <LoadingComponent />;
  }

  return (
    <>
      {auth.check && JSON.parse(localStorage.getItem("auth"))?.token ? (
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
