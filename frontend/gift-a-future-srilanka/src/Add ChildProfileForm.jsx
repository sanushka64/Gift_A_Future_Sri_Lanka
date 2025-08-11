import React from "react";
import { FaCamera, FaUpload } from "react-icons/fa";

export default function AddChildProfileForm({ onBack }) {
  return (
    <div style={{ display: "flex", padding: "40px", justifyContent: "center", flexWrap: "wrap" }}>
      {/* Left-side images */}
      <div style={{ flex: "1", minWidth: "300px", maxWidth: "400px", paddingRight: "40px" }}>
        <img
          src={`${import.meta.env.BASE_URL}img/addchild01.jpg`} // Replace with actual image paths
          alt="Child 1"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />
        <img
          src={`${import.meta.env.BASE_URL}img/addchild02.jpg`}
          alt="Child 2"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>

      {/* Right-side form */}
      <div style={{ flex: "1", minWidth: "300px", maxWidth: "500px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label>
            <b>Name</b>
            <input type="text" placeholder="Enter name" style={inputStyle} />
          </label>

          <label>
            <b>Age</b>
            <input type="number" placeholder="Enter age" style={inputStyle} />
          </label>

          <label>
            <b>Gender</b>
            <input type="text" placeholder="Enter gender" style={inputStyle} />
          </label>

          <label>
            <b>Region</b>
            <input type="text" placeholder="Enter region" style={inputStyle} />
          </label>

          <label>
            <b>Category of Need (eg:- education)</b>
            <input type="text" placeholder="Enter category" style={inputStyle} />
          </label>

          <label>
            <b>Short Story</b>
            <textarea placeholder="Enter short story" rows="4" style={textareaStyle}></textarea>
          </label>

          <label>
            <b>Image Upload</b>
            <div style={fileWrapperStyle}>
              <input type="file" style={fileInputStyle} />
              <FaCamera style={{ marginLeft: "10px", fontSize: "20px" }} />
            </div>
          </label>

          <label>
            <b>Supporting Documents</b>
            <div style={fileWrapperStyle}>
              <input type="file" style={fileInputStyle} />
              <FaUpload style={{ marginLeft: "10px", fontSize: "20px" }} />
            </div>
          </label>

          <button style={postBtnStyle}>Post</button>
          <button onClick={onBack} style={backBtnStyle}>← Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const fileWrapperStyle = {
  display: "flex",
  alignItems: "center",
};

const fileInputStyle = {
  flex: 1,
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const postBtnStyle = {
  backgroundColor: "#f1c40f",
  color: "#000",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

const backBtnStyle = {
  backgroundColor: "#ccc",
  color: "#000",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "10px",
};
