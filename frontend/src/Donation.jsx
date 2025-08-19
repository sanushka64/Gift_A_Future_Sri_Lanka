import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Donation({ child, onBack }) {
  const [donationType, setDonationType] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    province: "",
    city: "",
  });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    if (!donationType) return "Please select donation type.";
    if (!amount) return "Please select a donation amount.";
    if (
      !donorInfo.title ||
      !donorInfo.name ||
      !donorInfo.email ||
      !donorInfo.phone ||
      !donorInfo.province ||
      !donorInfo.city
    )
      return "Please fill all donor information fields.";
    if (!selectedBank) return "Please select a payment option.";
    if (!consentGiven) return "Please agree to the Privacy Policy.";
    return null;
  };

const handleDonate = () => {
  const error = validateForm();
  if (error) {
    Swal.fire({
      title: "Missing Information",
      text: error,
      icon: "error",
      confirmButtonColor: "#e74c3c",
    });
    return;
  }

  Swal.fire({
    title: "Secure Payment",
    width: 750,
    html: `
      <div style="display:flex; flex-direction:column; gap:18px; text-align:left; margin:auto; max-width:600px;">
        <div style="text-align:center; margin-bottom:10px;">
          <img src="https://img.icons8.com/color/64/visa.png" style="margin-right:12px"/>
          <img src="https://img.icons8.com/color/64/mastercard-logo.png"/>
        </div>
        <input type="text" id="cardName" class="swal2-input" 
          placeholder="Card Holder Name" 
          style="width:100%; border-radius:12px; padding:14px; font-size:16px"/>
        <input type="text" id="cardNumber" class="swal2-input" 
          placeholder="Card Number (16 digits)" maxlength="16"
          style="width:100%; border-radius:12px; padding:14px; font-size:18px; letter-spacing:3px"/>
        <div style="display:flex; gap:20px; width:100%;">
          <input type="text" id="expiry" class="swal2-input" 
            placeholder="MM/YY" maxlength="5"
            style="flex:1; border-radius:12px; padding:14px; font-size:16px; text-align:center"/>
          <input type="text" id="cvc" class="swal2-input" 
            placeholder="CVC" maxlength="3"
            style="flex:1; border-radius:12px; padding:14px; font-size:16px; text-align:center"/>
        </div>
        <p style="font-size:13px; color:gray; text-align:center; margin-top:5px;">
          🔒 Your payment is securely processed
        </p>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Pay Rs " + amount,
    confirmButtonColor: "#27ae60",
    cancelButtonText: "Cancel",
    preConfirm: () => {
  const cardName = document.getElementById("cardName").value.trim();
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvc = document.getElementById("cvc").value.trim();

  if (!cardName || !cardNumber || !expiry || !cvc) {
    Swal.showValidationMessage("Please fill all payment details.");
    return false;
  }

  if (cardNumber.length !== 16) {
    Swal.showValidationMessage("Card number must be 16 digits.");
    return false;
  }

  // Expiry validation
  const validateExpiry = (expiry) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      return "Expiry must be in MM/YY format.";
    }
    const [month, year] = expiry.split("/").map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Jan = 0
    const currentYear = currentDate.getFullYear() % 100; // last 2 digits

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Card is expired.";
    }

    return null;
  };

  const expiryError = validateExpiry(expiry);
  if (expiryError) {
    Swal.showValidationMessage(expiryError);
    return false;
  }

  if (cvc.length !== 3) {
    Swal.showValidationMessage("CVC must be 3 digits.");
    return false;
  }

  return { cardName, cardNumber, expiry, cvc };
},

  }).then((result) => {
    if (result.isConfirmed) {
      const payload = {
        donationType,
        amount: parseFloat(amount),
        bank: selectedBank,
        cardName: result.value.cardName,
        cardNumber: result.value.cardNumber,
        expiry: result.value.expiry,
        cvc: result.value.cvc,
        consentGiven,
        donor: donorInfo
      };
      console.log('Sending payload:', JSON.stringify(payload, null, 2));
      fetch('http://localhost:5002/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
          return response.text().then(text => {
            console.error('Error response body:', text);
            throw new Error(text || `HTTP error! Status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Success response:', data);
        Swal.fire({
          title: "✅ Payment Successful",
          text: `Thank you for your ${donationType} donation of Rs ${amount}! A confirmation email will be sent to ${donorInfo.email}.`,
          icon: "success",
          confirmButtonColor: "#3498db",
        });
        // Clear all fields after success
      setDonationType("");
      setAmount("");
      setSelectedBank("");
      setConsentGiven(false);
      setDonorInfo({
        title: "",
        name: "",
        email: "",
        phone: "",
        province: "",
        city: "",
      });
    })
    .catch(error => {
      Swal.fire({
        title: "Payment Failed",
        text: `An error occurred: ${error.message}. Please try again later.`,
        icon: "error",
        confirmButtonColor: "#e74c3c",
      });
      })
      .catch(error => {
        console.error('Fetch error:', error);
        Swal.fire({
          title: "Payment Failed",
          text: `An error occurred: ${error.message}. Please try again later.`,
          icon: "error",
          confirmButtonColor: "#e74c3c",
        });
      });
    }
  });
};
  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <img
          src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0056.jpg`}
          alt="Children"
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "500px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Donation Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          padding: "0 20px",
          marginTop: "20px",
        }}
      >
        {/* Left Image */}
        <div style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0057.jpg`}
            alt=""
            style={{
              width: "100%",
              maxHeight: "400px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Donation Box */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            height: "fit-content",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
            Join Us in Securing innocence, smiles & Future for Children Across
            Sri Lanka 😊
          </h2>

          {/* Toggle Donation Type */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            {["one-time", "monthly"].map((type) => (
              <button
                key={type}
                onClick={() => setDonationType(type)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border:
                    donationType === type ? "2px solid #000" : "1px solid #ccc",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                {type === "one-time" ? "One Time" : "Monthly"}
              </button>
            ))}
          </div>

          {/* Amount Selector */}
          <div style={{ textAlign: "center" }}>
            {[5000, 10000, 15000, 20000].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                style={{
                  margin: "5px",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border:
                    amount === val ? "2px solid #000" : "1px solid #ccc",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                Rs {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Donor Info Form */}
      <div
        style={{
          backgroundColor: "#3498db",
          padding: "30px",
          color: "#fff",
          marginTop: "30px",
          maxWidth: "1000px",
          margin: "30px auto",
          borderRadius: "8px",
        }}
      >
        <h3>
          Donor Information <span style={{ color: "red" }}>*</span>
        </h3>
        <form>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <select
              required
              value={donorInfo.title}
              onChange={(e) =>
                setDonorInfo({ ...donorInfo, title: e.target.value })
              }
            >
              <option value="">Title*</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
              <option value="Rev">Rev</option>
            </select>

            <input
              placeholder="Full Name*"
              required
              value={donorInfo.name}
              onChange={(e) =>
                setDonorInfo({ ...donorInfo, name: e.target.value })
              }
            />

            <input
              placeholder="Email*"
              type="email"
              required
              value={donorInfo.email}
              onChange={(e) =>
                setDonorInfo({ ...donorInfo, email: e.target.value })
              }
            />
            <input
              placeholder="Phone No.*"
              required
              value={donorInfo.phone}
              onChange={(e) =>
                setDonorInfo({ ...donorInfo, phone: e.target.value })
              }
            />

            <select
              required
              value={donorInfo.province}
              onChange={(e) =>
                setDonorInfo({ ...donorInfo, province: e.target.value })
              }
            >
              <option value="">Province*</option>
              <option value="Western">Western</option>
              <option value="Central">Central</option>
              <option value="Southern">Southern</option>
              <option value="Northern">Northern</option>
              <option value="Eastern">Eastern</option>
              <option value="North Western">North Western</option>
              <option value="North Central">North Central</option>
              <option value="Uva">Uva</option>
              <option value="Sabaragamuwa">Sabaragamuwa</option>
            </select>

            <input
              placeholder="City*"
              required
              value={donorInfo.city}
              onChange={(e) =>
                setDonorInfo({ ...donorInfo, city: e.target.value })
              }
            />
          </div>
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <label style={{ fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                style={{ marginRight: "10px" }}
              />
              I agree to the <a href="https://yourwebsite.com/privacy-policy" target="_blank" style={{ color: "#f1c40f" }}>Privacy Policy</a> and consent to the processing of my personal data for this donation.
            </label>
          </div>
        </form>
      </div>

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <h3>
          Payment Options <span style={{ color: "red" }}>*</span>
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            justifyItems: "center",
          }}
        >
          {[
            { src: `${import.meta.env.BASE_URL}img/HNB.jpg`, alt: "HNB" },
            { src: `${import.meta.env.BASE_URL}img/seylan.png`, alt: "Seylan" },
            { src: `${import.meta.env.BASE_URL}img/boc.png`, alt: "BOC" },
            { src: `${import.meta.env.BASE_URL}img/people.png`, alt: "People's Bank" },
            { src: `${import.meta.env.BASE_URL}img/commercial.png`, alt: "Commercial Bank" },
            { src: `${import.meta.env.BASE_URL}img/nation.jpeg`, alt: "Nations Trust" },
            { src: `${import.meta.env.BASE_URL}img/sampath.png`, alt: "Sampath" },
          ].map((bank, idx) => (
            <label key={idx} style={{ cursor: "pointer", textAlign: "center" }}>
              <input
                type="radio"
                name="paymentOption"
                value={bank.alt}
                style={{ display: "none" }}
                onChange={(e) => setSelectedBank(e.target.value)}
              />
              <img
                src={bank.src}
                alt={bank.alt}
                onClick={() => setSelectedBank(bank.alt)}
                style={{
                  width: "120px",
                  borderRadius: "10px",
                  padding: "5px",
                  border:
                    selectedBank === bank.alt
                      ? "3px solid #f1c40f"
                      : "2px solid transparent",
                  boxShadow:
                    selectedBank === bank.alt
                      ? "0px 0px 10px rgba(0,0,0,0.3)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
              />
              <span style={{ marginTop: "8px", fontSize: "14px" }}>
                {bank.alt}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button
          onClick={handleDonate}
          disabled={!consentGiven}
          style={{
            backgroundColor: consentGiven ? "#3498db" : "#ccc",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "30px",
            padding: "15px 40px",
            fontSize: "18px",
            cursor: consentGiven ? "pointer" : "not-allowed",
          }}
        >
          DONATE NOW
        </button>
      </div>

      <div style={{ padding: "20px", textAlign: "center" }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: "#f1c40f",
            padding: "10px 20px",
            borderRadius: "25px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}