import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { baseUrl } from "../config";

const Secure = () => {
  const [authorized, setAuthorized] = useState(null); // null = loading state
  const [accessibleRoutes, setAccessibleRoutes] = useState([]);
  const token = Cookies.get("jwtToken");
  const location = useLocation();

  const resourceToPath = {
    Dashboard: "/dashboard",
    "Course Management": "/course-management",
    Courses: "/courses",
    Attendance: "/attendance",
    "Course Enrollment": "/course-enm",
    "Student Registration": "/student-reg",
    "Volunteer Registration": "/volunteer-reg",
    Payment: "/payment",
  };

  useEffect(() => {
    if (!token) {
      setAuthorized(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 

      if (decodedToken.exp < currentTime) {
        alert("Session expired. Please log in again.");
        Cookies.remove("jwtToken");
        setAuthorized(false);
        return;
      }

      axios
        .get(`${baseUrl}user/role-resources/${decodedToken.userId}`)
        .then((response) => {
          const userResources = response.data;

          const userPaths = userResources
            .map((resource) => resourceToPath[resource])
            .filter((path) => path); 

          if (userPaths.includes(location.pathname)) {
            setAccessibleRoutes(userPaths);
            setAuthorized(true);
          } else {
            alert("Access denied. Insufficient permissions.");
            setAuthorized(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user resources:", error);
          alert("Error validating access. Please log in again.");
          Cookies.remove("jwtToken");
          setAuthorized(false);
        });
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove("jwtToken");
      setAuthorized(false);
    }
  }, [token, location.pathname]);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Secure;
