import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthTest from "./AuthTest";
import Dashboard from "./Dashboard";
import GoogleSuccess from "./GoogleSuccess";

export default function App() {
  const [userEmail, setUserEmail] = useState(null);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    // optionally call backend logout endpoint here
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/google-success"
          element={<GoogleSuccess onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/dashboard"
          element={
            userEmail ? (
              <Dashboard userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <AuthTest onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            userEmail ? (
              <Dashboard userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <AuthTest onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
      </Routes>
    </Router>
  );
}
