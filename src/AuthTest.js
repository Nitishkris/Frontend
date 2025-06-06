import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthTest({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const backendUrl = "http://localhost:8080/users";

  const handleRegister = async () => {
    try {
      const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(`User registered: ${data.email}`);
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const text = await res.text();
      if (res.ok) {
        setMessage(text);
        onLoginSuccess(email);              // set email in App
        navigate("/event-form");            // redirect to form
      } else {
        setMessage("Login failed: " + text);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Auth Form</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleRegister} style={{ marginRight: 10 }}>
        Create
      </button>
      <button onClick={handleLogin}>Login</button>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </div>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}
