import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess({ onLoginSuccess }) {
  const navigate = useNavigate();

  useEffect(() => {
    // simulate getting email from backend (adapt to your backend)
    fetch("http://localhost:8080/users/current") // replace with your endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          onLoginSuccess(data.email);
          navigate("/event-form");
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [onLoginSuccess, navigate]);

  return <p>Logging in with Google...</p>;
}
