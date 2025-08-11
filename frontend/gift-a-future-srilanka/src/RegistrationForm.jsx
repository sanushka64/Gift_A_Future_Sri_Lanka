import React, { useState } from "react";
import toast from "react-hot-toast";
import "./RegistrationForm.css"; // You must create and style this CSS file

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

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
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
      }

      toast.success("Registered successfully!");
      setRegistered(true);
      form.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="thank-you-container">
        <h2>Thank you for registering!</h2>
        <p>Your registration has been received successfully.</p>
        <button onClick={() => setRegistered(false)} className="btn-primary">
          Register Another
        </button>
      </div>
    );
  }

  const formFields = [
    { label: "Organization Name", name: "organizationName" },
    { label: "Organization Address", name: "organizeAddress", type: "textarea" },
    { label: "Registered Number", name: "registeredNumber" },
    { label: "Email", name: "email", type: "email" },
    { label: "Contact Number", name: "contactNumber" },
    { label: "User Name", name: "userName" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  return (
    <div className="container">
      {/* Left side images */}
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

      {/* Right side form */}
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

        {/* File upload input */}
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
