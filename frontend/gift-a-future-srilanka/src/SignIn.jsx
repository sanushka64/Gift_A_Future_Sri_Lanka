import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NGODashboard from "./NGODashboard";
import AdminDashboard from "./AdminDashboard";
import Goverment from "./Goverment"; // ✅ new
import toast from "react-hot-toast";

export default function SignIn({ onTabChange, activeTab, onSponsorClick }) {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const userName = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5001/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ userName, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || `HTTP ${response.status}: ${text}`);
        } catch {
          throw new Error(`HTTP ${response.status}: ${text || "Sign-in failed"}`);
        }
      }

      const data = await response.json();
      let role = data.role;

      // ✅ Override: Government login
      if (userName === "goverment" && password === "gov123") {
        role = "ROLE_GOVERNMENT";
      }

      if (!role) throw new Error("No role returned from server");

      setUser(data);
      setUserRole(role);
      localStorage.setItem("userRole", role);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("username", userName);

      toast.success("Signed in successfully!");
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setUserRole(null);
    setUser(null);
    toast.success("Signed out successfully!");
  };

  // ✅ Role-based dashboards
  if (userRole === "ROLE_ADMIN") {
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

  if (userRole === "ROLE_NGO") {
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

  if (userRole === "ROLE_GOVERNMENT") {
    return (
      <Goverment
        user={user}
        onTabChange={onTabChange}
        onSponsorClick={onSponsorClick}
        activeTab={activeTab}
        onSignOut={handleSignOut}
      />
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
            {errorMessage && (
              <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
            )}

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

            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
