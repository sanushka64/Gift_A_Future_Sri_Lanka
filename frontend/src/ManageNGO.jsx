import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ManageNGO({ onBack }) {
  const [ngoList, setNgoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/users/pending-users", {
      headers: { Authorization: "Basic " + btoa("admin:admin123") },
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }
        return response.json();
      })
      .then((data) => setNgoList(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.error(`Failed to fetch pending users: ${error.message}`);
      });
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    fetch(`http://localhost:5001/api/users/update-status/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa("admin:admin123"),
      },
      body: new URLSearchParams({ status: newStatus, approvedBy: "admin" }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }
        return response.json();
      })
      .then(() => {
        setNgoList((prev) => prev.filter((ngo) => ngo.userId !== userId || newStatus !== "APPROVED"));
        toast.success(`Status updated to ${newStatus}${newStatus === "APPROVED" ? ". Email notification sent." : ""}`);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.error(`Status update failed: ${error.message}`);
      });
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    marginBottom: "20px",
  };

  const approveBtn = {
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "6px 10px",
    marginRight: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const pendingBtn = {
    backgroundColor: "#f1c40f",
    color: "#fff",
    padding: "6px 10px",
    marginRight: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const rejectBtn = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const backBtn = {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        NGO Registration Table
      </h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>User ID</th>
            <th style={{ width: "15%" }}>Organization Name</th>
            <th style={{ width: "15%" }}>Address</th>
            <th style={{ width: "10%" }}>Contact</th>
            <th style={{ width: "10%" }}>Registered No</th>
            <th style={{ width: "15%" }}>Certificate</th>
            <th style={{ width: "10%" }}>Email</th>
            <th style={{ width: "10%" }}>User Name</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ngoList.map((ngo) => (
            <tr key={ngo.userId}>
              <td>{ngo.userId}</td>
              <td>{ngo.organizationName}</td>
              <td>{ngo.organizationAddress}</td>
              <td>{ngo.contactNumber}</td>
              <td>{ngo.registeredNumber}</td>
              <td>
                <a
                  href={`http://localhost:5001/api/users/certificate/${ngo.userId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Certificate
                </a>
              </td>
              <td>{ngo.email}</td>
              <td>{ngo.userName}</td>
              <td>{ngo.status}</td>
              <td>
                <button
                  style={approveBtn}
                  onClick={() => handleStatusChange(ngo.userId, "APPROVED")}
                >
                  Approve
                </button>
                <button
                  style={pendingBtn}
                  onClick={() => handleStatusChange(ngo.userId, "PENDING")}
                >
                  Pending
                </button>
                <button
                  style={rejectBtn}
                  onClick={() => handleStatusChange(ngo.userId, "REJECTED")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack} style={backBtn}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}