import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleSuccess({ onLoginSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:8080/users/me", {
      credentials: "include", // Important! Send cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => {
  if (data.email) {
    onLoginSuccess(data.email); // or data.name if you prefer
    navigate("/dashboard");
  } else {
    navigate("/");
  }
})
      .catch(() => {
        navigate("/");
      });
  }, [location, onLoginSuccess, navigate]);

  return <p>Loading user info...</p>;
}
