import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NGODashboard from "./NGODashboard";
import AdminDashboard from "./AdminDashboard";

export default function SignIn({ onTabChange, activeTab, onSponsorClick }) {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "admin123") {
      setUserRole("admin");
      setUser({ username });
    } else {
      // Simulate NGO login
      setUserRole("ngo");
      setUser({ username });
    }
  };

  const handleSignOut = () => {
    setUserRole(null);
    setUser(null);
  };

  // ✅ Show Admin Dashboard after admin login
  if (userRole === "admin") {
    return (
      <AdminDashboard
        user={user}
        onTabChange={onTabChange}
        onSponsorClick={onSponsorClick}
        activeTab={activeTab}
        onSignOut={handleSignOut}
      />
    );
  }

  // ✅ Show NGO Dashboard after NGO login
  if (userRole === "ngo") {
    return (
      <NGODashboard
        user={user}
        onTabChange={onTabChange}
        onSponsorClick={onSponsorClick}
        activeTab={activeTab}
        onSignOut={handleSignOut}
      />
    );
  }

  // ✅ Show login form before login
  return (
    <>
      <Navbar
        activeTab={activeTab}
        onTabChange={onTabChange}
        onSponsorClick={onSponsorClick}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 20px",
        }}
      >
        <div style={{ flex: 1, maxWidth: "500px", paddingRight: "40px" }}>
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0151.jpg`}
            alt="Gift a Future Sri Lanka"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>

        <div style={{ flex: 1, maxWidth: "400px" }}>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: "18px", fontWeight: "bold" }}>
                User Name
              </label>
              <input name="username" type="text" required style={inputStyle} />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: "18px", fontWeight: "bold" }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                style={inputStyle}
              />
            </div>

            <button type="submit" style={buttonStyle}>
              Sign In
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "12px",
  fontSize: "18px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
