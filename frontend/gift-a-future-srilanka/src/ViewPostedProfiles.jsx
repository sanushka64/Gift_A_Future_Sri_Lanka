import React, { useEffect, useState } from "react";

export default function ViewPostedProfiles({ onBack }) {
  const [profiles, setProfiles] = useState([
    // Temporary static data (replace with API call later)
    {
      id: 1,
      name: "Behan Gunawardhana",
      age: 10,
      region: "Southern Province",
      imageUrl: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0155.jpg`,
    },
    {
      id: 2,
      name: "Nethara Aponso",
      age: 9,
      region: "Central Province",
      imageUrl: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0157.jpg`,
    },
    {
      id: 3,
      name: "Nipuna Weerasooriya",
      age: 8,
      region: "Western Province",
      imageUrl: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0156.jpg`,
    },
  ]);

  // ✅ Later, you can uncomment this to fetch from backend
  /*
  useEffect(() => {
    fetch("http://localhost:8080/api/child-profiles")
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(err => console.error("Error fetching profiles:", err));
  }, []);
  */

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Posted Child Profiles</h2>

      {/* Grid layout */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {profiles.map((child) => (
          <div
            key={child.id}
            style={{
              width: "300px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            <img
              src={child.imageUrl}
              alt={child.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            />
            <div style={{ padding: "10px" }}>
              <p><strong>Name -</strong> {child.name}</p>
              <p><strong>Age -</strong> {child.age} years</p>
              <p><strong>Region -</strong> {child.region}</p>
            </div>
            <div>
              <button style={updateBtn}>Update</button>
              <button style={deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Back button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={onBack} style={backBtn}>← Back to Dashboard</button>
      </div>
    </div>
  );
}

const updateBtn = {
  backgroundColor: "#f1c40f",
  color: "#fff",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  margin: "10px 5px 0",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  margin: "10px 5px 0",
  cursor: "pointer",
};

const backBtn = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "12px 24px",
  fontSize: "16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
