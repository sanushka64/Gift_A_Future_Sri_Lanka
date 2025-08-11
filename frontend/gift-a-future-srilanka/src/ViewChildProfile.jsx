import React, { useState, useEffect } from 'react';
import Donation from './Donation';

export default function ViewChildProfile({ child, onBack }) {
  const [showDonation, setShowDonation] = useState(false);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  if (showDonation) {
    return <Donation child={child} onBack={onBack} />;
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      {/* Top section: Image left, Info right */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}
      >
        {/* Child Image */}
        <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
          <img
            src={child?.image || 'https://via.placeholder.com/350x350'}
            alt={child?.name || 'Child'}
            style={{
              width: '100%',
              maxWidth: '350px',
              borderRadius: '10px',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Basic Info */}
        <div style={{ flex: '1 1 300px', fontSize: '16px', lineHeight: '1.6' }}>
          <p><strong>Name:</strong> {child?.name}</p>
          <p><strong>Age:</strong> {child?.age}</p>
          <p><strong>Gender:</strong> {child?.gender}</p>
          <p><strong>Location:</strong> {child?.region}</p>
        </div>
      </div>

      {/* Story Section */}
      <div
        style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}
      >
        <h3 style={{ textDecoration: 'underline', cursor: 'default' }}>
          {child?.storyTitle || 'Child’s Story'}
        </h3>
        <p style={{ whiteSpace: 'pre-line' }}>
          {child?.fullStory || 'No story available.'}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            backgroundColor: '#f1c40f', // red tone for urgency
            color: '#fff', // white text
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1c40f'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#f1c40f'}
          onClick={() => setShowDonation(true)}
        >
          Donate Now
        </button>

        <br />

        <button
          style={{
            backgroundColor: '#ccc',
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
