import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Base_URL from "../../config/Config";
import Spinner from "react-spinner-material";

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
        const res = await axios.post(`${Base_URL}/tokenmatch`, {
          jwt,
          email,
          enu,
        });

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

    if (loading) {
    // Display a loading component while data is being fetched
    return (
      <>
        <div className="spindiv">
          <div className="spin">
            <Spinner />
          </div>
        </div>
      </>
    )
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
