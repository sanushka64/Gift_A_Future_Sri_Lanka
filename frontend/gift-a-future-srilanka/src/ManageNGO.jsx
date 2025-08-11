import React, { useState } from "react";

export default function ManageNGO({ onBack }) {
  // Dummy NGO data (replace with backend data later)
  const [ngoList, setNgoList] = useState([
    {
      ngoId: "NGO001",
      orgName: "Hope Foundation",
      address: "Colombo, Sri Lanka",
      contact: "0112345678",
      regNo: "REG-12345",
      requestForm: "request_hope.pdf",
      certificate: "cert_hope.pdf",
      userId: "U001",
      status: "Pending",
    },
    {
      ngoId: "NGO002",
      orgName: "Green World",
      address: "Kandy, Sri Lanka",
      contact: "0813456789",
      regNo: "REG-67890",
      requestForm: "request_green.pdf",
      certificate: "cert_green.pdf",
      userId: "U002",
      status: "Approved",
    },
    {
      ngoId: "NGO003",
      orgName: "Future Builders",
      address: "Galle, Sri Lanka",
      contact: "0914567890",
      regNo: "REG-54321",
      requestForm: "request_future.pdf",
      certificate: "cert_future.pdf",
      userId: "U003",
      status: "Rejected",
    },
  ]);

  // Handle status change (UI only for now)
  const handleStatusChange = (ngoId, newStatus) => {
    setNgoList((prev) =>
      prev.map((ngo) =>
        ngo.ngoId === ngoId ? { ...ngo, status: newStatus } : ngo
      )
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        NGO Registration Table
      </h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ width: "8%" }}>NGOID</th>
            <th style={{ width: "15%" }}>Organization Name</th>
            <th style={{ width: "15%" }}>Address</th>
            <th style={{ width: "10%" }}>Contact</th>
            <th style={{ width: "10%" }}>Registered No</th>
            <th style={{ width: "10%" }}>Request Form</th>
            <th style={{ width: "10%" }}>Certificate</th>
            <th style={{ width: "7%" }}>User ID</th>
            <th style={{ width: "7%" }}>Status</th>
            <th style={{ width: "18%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ngoList.map((ngo) => (
            <tr key={ngo.ngoId}>
              <td>{ngo.ngoId}</td>
              <td>{ngo.orgName}</td>
              <td>{ngo.address}</td>
              <td>{ngo.contact}</td>
              <td>{ngo.regNo}</td>
              <td>
                <a
                  href={`/${ngo.requestForm}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ngo.requestForm}
                </a>
              </td>
              <td>
                <a
                  href={`/${ngo.certificate}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ngo.certificate}
                </a>
              </td>
              <td>{ngo.userId}</td>
              <td>{ngo.status}</td>
              <td>
                <button
                  style={approveBtn}
                  onClick={() => handleStatusChange(ngo.ngoId, "Approved")}
                >
                  Approve
                </button>
                <button
                  style={pendingBtn}
                  onClick={() => handleStatusChange(ngo.ngoId, "Pending")}
                >
                  Pending
                </button>
                <button
                  style={rejectBtn}
                  onClick={() => handleStatusChange(ngo.ngoId, "Rejected")}
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

// Styles
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
