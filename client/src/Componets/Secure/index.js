import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { userRoleResources } from "../api";

const Secure = () => {
  const [authorized, setAuthorized] = useState(null);
  const token = Cookies.get("token");
  const location = useLocation();

  const pathToResource = {
    "/dashboard": "Dashboard",
    "/student-reg": "Student Registration",
    "/course-enm": "Course Enrollment",
    "/attendance": "Attendance Tracking",
    "/course-management": "Course Management",
    "/volunteer-reg": "Volunteers",
    "/profile": "Profile",
  };

  useEffect(() => {
    if (!token) {
      setAuthorized(false);
      return;
    }

    const verifyAccess = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const userResources = await userRoleResources(userId);

        if (
          userResources.includes("Dashboard") &&
          userResources.includes("Student Registration") &&
          userResources.includes("Course Enrollment") &&
          userResources.includes("Attendance Tracking") &&
          userResources.includes("Course Management") &&
          userResources.includes("Volunteers") &&
          userResources.includes("Profile")
          
        ) {
          setAuthorized(true);
          return;
        }

        const requiredResource = pathToResource[location.pathname];
        if (requiredResource && userResources.includes(requiredResource)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Error verifying access:", error);
        setAuthorized(false);
      }
    };

    verifyAccess();
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
