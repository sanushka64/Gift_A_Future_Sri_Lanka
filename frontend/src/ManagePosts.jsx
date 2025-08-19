import React, { useState } from "react";

export default function ManagePosts({ onBack }) {
  // Dummy data for now — replace with backend later
  const [posts, setPosts] = useState([
    {
      childId: "CH001",
      name: "Nipuna Weerasooriya",
      age: 8,
      gender: "Male",
      region: "Western Province",
      category: "Education",
      shortStory: "Struggles to attend school regularly due to poverty.",
      fullStory:
        "Nipuna lives with his grandmother and dreams of becoming a teacher. He needs school supplies and basic financial support to continue his studies.",
      image: "Nipuna",
      doc: "doc_nipuna.pdf",
      status: "Pending",
      ngoId: "NGO001",
    },
    {
      childId: "CH002",
      name: "Sanduni Jayasinghe",
      age: 10,
      gender: "Female",
      region: "Southern Province",
      category: "Health",
      shortStory: "Diagnosed with chronic asthma needing regular treatment.",
      fullStory:
        "Sanduni requires regular medical check-ups and medicine. Her family is struggling to afford her healthcare costs. She is bright and enjoys drawing.",
      image: "Sanduni",
      doc: "doc_sanduni.pdf",
      status: "Approved",
      ngoId: "NGO002",
    },
    {
      childId: "CH003",
      name: "Mohamed Ishan",
      age: 7,
      gender: "Male",
      region: "Eastern Province",
      category: "Nutrition",
      shortStory:
        "Underweight and malnourished due to food insecurity.",
      fullStory:
        "Ishan lives in a rural village with limited access to nutritious food. He needs proper meals and vitamin supplements to grow healthy.",
      image: "Ishan",
      doc: "doc_ishan.pdf",
      status: "Rejected",
      ngoId: "NGO003",
    },
  ]);

  // Change status handler
  const handleStatusChange = (childId, newStatus) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.childId === childId ? { ...post, status: newStatus } : post
      )
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}>
        Child Profiles - Gift A Future
      </h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ChildID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Region</th>
            <th>Category Of Need</th>
            <th>Short Story</th>
            <th>Full Story</th>
            <th>Image</th>
            <th>Supporting Documents</th>
            <th>Status</th>
            <th>Actions</th>
            <th>NGOID</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.childId}>
              <td>{post.childId}</td>
              <td>{post.name}</td>
              <td>{post.age}</td>
              <td>{post.gender}</td>
              <td>{post.region}</td>
              <td>{post.category}</td>
              <td>{post.shortStory}</td>
              <td>{post.fullStory}</td>
              <td>{post.image}</td>
              <td>
                <a href={`/${post.doc}`} target="_blank" rel="noreferrer">
                  {post.doc}
                </a>
              </td>
              <td>{post.status}</td>
              <td>
                <button
                  style={approveBtn}
                  onClick={() => handleStatusChange(post.childId, "Approved")}
                >
                  Approve
                </button>
                <button
                  style={pendingBtn}
                  onClick={() => handleStatusChange(post.childId, "Pending")}
                >
                  Pending
                </button>
                <button
                  style={rejectBtn}
                  onClick={() => handleStatusChange(post.childId, "Rejected")}
                >
                  Reject
                </button>
              </td>
              <td>{post.ngoId}</td>
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

// Table styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
};

const approveBtn = {
  backgroundColor: "#2ecc71",
  color: "#fff",
  padding: "6px 12px",
  marginRight: "4px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const pendingBtn = {
  backgroundColor: "#f1c40f",
  color: "#fff",
  padding: "6px 12px",
  marginRight: "4px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const rejectBtn = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const backBtn = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
