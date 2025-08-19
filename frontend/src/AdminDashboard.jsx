import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ManageNGO from "./ManageNGO";
import ManagePosts from "./ManagePosts";

export default function AdminDashboard({ user, onTabChange, onSponsorClick, activeTab, onSignOut }) {
  const [currentView, setCurrentView] = useState("dashboard"); // default

  // Function to switch views
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      <Navbar onTabChange={onTabChange} onSponsorClick={onSponsorClick} activeTab={activeTab} />

      {/* View Switcher */}
      {currentView === "dashboard" && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "30px" }}>
            Welcome to Admin Dashboard
          </h1>

          <div style={{ display: "flex", justifyContent: "center", gap: "100px", marginBottom: "40px" }}>
            <div>
              <h3>Total Registered NGOs</h3>
              <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>12</h1>
            </div>
            <div>
              <h3>Total Donations</h3>
              <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>120k</h1>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <button style={yellowBtn} onClick={() => handleViewChange("manageNGO")}>
              View And Approve NGO Accounts
            </button>
            <button style={blueBtn} onClick={() => handleViewChange("managePosts")}>
              View And Approve NGO Posts
            </button>
            <button onClick={onSignOut} style={signOutBtn}>
              Sign Out
            </button>
          </div>
        </div>
      )}

      {currentView === "manageNGO" && <ManageNGO onBack={() => handleViewChange("dashboard")} />}
      {currentView === "managePosts" && <ManagePosts onBack={() => handleViewChange("dashboard")} />}

      <Footer />
    </>
  );
}

const yellowBtn = {
  backgroundColor: "#f1c40f",
  color: "#fff",
  padding: "14px 28px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  margin: "10px",
  cursor: "pointer",
};

const blueBtn = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "14px 28px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  margin: "10px",
  cursor: "pointer",
};

const signOutBtn = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "14px 28px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  margin: "10px",
  cursor: "pointer",
};
