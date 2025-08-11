import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Donation({ child, onBack }) {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
useEffect(() => {
    window.scrollTo(0, 0); // scrolls to top when component mounts
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>


      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <img
          src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0056.jpg`}
          alt="Children"
          style={{
           width: '100%',
    maxWidth: '1000px',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Soft shadow
    display: 'block',
    margin: '0 auto', // Center the image
          }}
        />
      </div>

      {/* Main Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '30px',
          padding: '0 20px',
          marginTop: '20px',
        }}
      >
        {/* Left Image */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0057.jpg`}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '400px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Right Donation Box */}
        <div
          style={{
            flex: '1',
            minWidth: '300px',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            height: 'fit-content',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Join Us in Securing innocence, smiles & Future for Children Across Sri Lanka 😊
          </h2>

          {/* Toggle */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <button
              onClick={() => setDonationType('one-time')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border:
                  donationType === 'one-time'
                    ? '2px solid #000'
                    : '1px solid #ccc',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              One Time
            </button>
            <button
              onClick={() => setDonationType('monthly')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border:
                  donationType === 'monthly'
                    ? '2px solid #000'
                    : '1px solid #ccc',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              Monthly
            </button>
          </div>

          {/* Amount Selector */}
          <div style={{ textAlign: 'center' }}>
            {[5000, 10000, 15000].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                style={{
                  margin: '5px',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  border:
                    amount === val
                      ? '2px solid #000'
                      : '1px solid #ccc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                }}
              >
                Rs {val}
              </button>
            ))}
            <button
              onClick={() => setAmount('')}
              style={{
                margin: '5px',
                padding: '10px 20px',
                borderRadius: '20px',
                border:
                  amount === ''
                    ? '2px solid #000'
                    : '1px solid #ccc',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              Rs 20000
            </button>
          </div>
        </div>
      </div>

{/* Donor Info Form */}
<div
  style={{
    backgroundColor: '#3498db',
    padding: '30px',
    color: '#fff',
    marginTop: '30px',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '8px',
  }}
>
  <h3>
    Donor Information <span style={{ color: 'red' }}>*</span>
  </h3>
  <form>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
      }}
    >
      {/* Title Dropdown */}
      <select
        required
        style={{
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          width: '100%',
          fontSize: '14px',
        }}
      >
        <option value="">Title*</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
        <option value="Rev">Rev</option>
      </select>

      <input placeholder="Full Name*" required />

      <input placeholder="Email*" type="email" required />
      <input placeholder="Phone No.*" required />

      {/* Province Dropdown */}
      <select
        required
        style={{
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          width: '100%',
          fontSize: '14px',
        }}
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

      <input placeholder="City*" required />
    </div>
  </form>
</div>

{/* Payment Options */}
<div
  style={{
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  }}
>
  <h3>
    Payment Options <span style={{ color: 'red' }}>*</span>
  </h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      justifyItems: 'center',
    }}
  >
    {[
      { src: `${import.meta.env.BASE_URL}img/HNB.jpg`, alt: 'HNB' },
      { src: `${import.meta.env.BASE_URL}img/seylan.png`, alt: 'Seylan' },
      { src: `${import.meta.env.BASE_URL}img/boc.png`, alt: 'BOC' },
      { src: `${import.meta.env.BASE_URL}img/people.png`, alt: "People's Bank" },
      { src: `${import.meta.env.BASE_URL}img/commercial.png`, alt: 'Commercial Bank' },
      { src: `${import.meta.env.BASE_URL}img/nation.jpeg`, alt: 'Nations Trust' },
      { src: `${import.meta.env.BASE_URL}img/sampath.png`, alt: 'Sampath' },
    ].map((bank, idx) => (
      <label
        key={idx}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="radio"
          name="paymentOption"
          value={bank.alt}
          style={{ display: 'none' }}
          onChange={(e) => setSelectedBank(e.target.value)}
        />
        <img
          src={bank.src}
          alt={bank.alt}
          onClick={() => setSelectedBank(bank.alt)}
          style={{
            width: '120px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px',
            padding: '5px',
            border:
              selectedBank === bank.alt ? '3px solid #f1c40f' : '2px solid transparent',
            boxShadow:
              selectedBank === bank.alt
                ? '0px 0px 10px rgba(0,0,0,0.3)'
                : 'none',
            transition: 'all 0.3s ease',
          }}
        />
        <span style={{ marginTop: '8px', fontSize: '14px' }}>{bank.alt}</span>
      </label>
    ))}
  </div>
</div>

{/* Donate Button */}
<div style={{ textAlign: 'center', marginBottom: '40px' }}>
  <button
    onClick={() => {
      Swal.fire({
        title: 'Thank You!',
        text: 'Your generosity will help change lives.',
        icon: 'success',
        confirmButtonText: 'Close',
        confirmButtonColor: '#3498db',
      });
    }}
    style={{
      backgroundColor: '#3498db',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '30px',
      padding: '15px 40px',
      fontSize: '18px',
      cursor: 'pointer',
    }}
  >
    DONATE NOW
  </button>
</div>
{/* Back Button */}
<div style={{ padding: '20px', textAlign: 'center' }}>
  <button
    onClick={onBack}
    style={{
      backgroundColor: '#f1c40f',
      padding: '10px 20px',
      borderRadius: '25px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#d4ac0d')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f1c40f')}
  >
    ← Back
  </button>
</div>

    </div>
  );
}
