import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddChildProfileForm from "./Add ChildProfileForm";
import ViewPostedProfiles from "./ViewPostedProfiles"; // ✅ Import your new component

export default function NGODashboard({ user, onTabChange, onSponsorClick, activeTab, onSignOut }) {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [showViewProfiles, setShowViewProfiles] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/total-posts")
      .then((res) => res.json())
      .then((data) => setTotalPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));

    fetch("http://localhost:8080/api/dashboard/total-donations")
      .then((res) => res.json())
      .then((data) => setTotalDonations(data))
      .catch((err) => console.error("Failed to fetch donations:", err));
  }, []);

  // ✅ If AddChildProfileForm is active
  if (showAddChildForm) {
    return (
      <>
        <Navbar
          onTabChange={(tab) => {
            setShowAddChildForm(false);
            setShowViewProfiles(false);
            onTabChange(tab);
          }}
          onSponsorClick={onSponsorClick}
          activeTab={activeTab}
        />
        <div style={{ padding: "40px" }}>
          <AddChildProfileForm onBack={() => setShowAddChildForm(false)} />
        </div>
        <Footer />
      </>
    );
  }

  // ✅ If ViewPostedProfiles is active
  if (showViewProfiles) {
    return (
      <>
        <Navbar
          onTabChange={(tab) => {
            setShowAddChildForm(false);
            setShowViewProfiles(false);
            onTabChange(tab);
          }}
          onSponsorClick={onSponsorClick}
          activeTab={activeTab}
        />
        <div style={{ padding: "40px" }}>
          <ViewPostedProfiles onBack={() => setShowViewProfiles(false)} />
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Main dashboard screen
  return (
    <>
      <Navbar
        onTabChange={(tab) => {
          setShowAddChildForm(false);
          setShowViewProfiles(false);
          onTabChange(tab);
        }}
        onSponsorClick={onSponsorClick}
        activeTab={activeTab}
      />

      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
          Welcome, {user?.username || "NGO User"}! 👋
        </h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "100px", marginBottom: "30px" }}>
          <div>
            <h3>Total Number Of Posts Of The NGO</h3>
            <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>{totalPosts}</h1>
          </div>
          <div>
            <h3>Total Donations For Them</h3>
            <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
              {(totalDonations / 1000).toFixed(2)}k
            </h1>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <button style={yellowBtn} onClick={() => setShowAddChildForm(true)}>
            Add New Child Profile
          </button>
          <button style={blueBtn} onClick={() => setShowViewProfiles(true)}>
            View Posted Profiles
          </button>
          <button onClick={onSignOut} style={signOutBtn}>
            Sign Out
          </button>
        </div>
      </div>

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
