import React from "react";

export default function Dashboard({ userEmail, onLogout }) {
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, textAlign: "center" }}>
      <h2>Welcome, {userEmail}!</h2>
      <p>You are now logged in.</p>
      <button
        onClick={onLogout}
        style={{
          marginTop: 20,
          padding: "8px 16px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
