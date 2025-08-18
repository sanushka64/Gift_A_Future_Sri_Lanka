import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "./RegistrationForm.css";

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      // Backend success
      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        html: `
          <p>Your account will be <strong>verified by our team within 48 hours</strong> before approval.</p>
          <p>You will receive a <strong>confirmation email</strong> once approved.</p>
        `,
        confirmButtonColor: "#4CAF50",
      });

      form.reset(); // Clear form but keep same page
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { label: "Organization Name", name: "organizationName" },
    { label: "Organization Address", name: "organizationAddress", type: "textarea" },
    { label: "Registered Number", name: "registeredNumber" },
    { label: "Email", name: "email", type: "email" },
    { label: "Contact Number", name: "contactNumber" },
    { label: "User Name", name: "userName" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  return (
    <div className="container">
      <div className="image-container">
        <img
          src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0045.jpg`}
          alt="Join With Us"
          className="image"
        />
        <img
          src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0055.jpg`}
          alt="Gift a Future"
          className="image"
        />
      </div>

      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {formFields.map(({ label, name, type = "text" }) => (
          <div key={name} className="form-field">
            <label htmlFor={name}>{label}</label>
            {type === "textarea" ? (
              <textarea id={name} name={name} required rows={3} />
            ) : (
              <input type={type} id={name} name={name} required />
            )}
          </div>
        ))}

        <div className="form-field">
          <label htmlFor="document">Upload Registration Certificate (PDF)</label>
          <input
            type="file"
            id="document"
            name="document"
            accept=".pdf"
            required
            className="file-input"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
