import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ViewChildProfile from './ViewChildProfile';
import Donation from './Donation';

function SupportAChild({ onTabChange, onSponsorClick, activeTab }) {
  const [selectedChild, setSelectedChild] = useState(null); // For viewing profile
  const [donationChild, setDonationChild] = useState(null); // For donation view

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, []);

  const children = [
    {
      name: 'Behan Gunawardhana',
      age: '10 years',
      region: 'Southern Province',
      image: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0155.jpg`,
      description: 'Behan loves reading books and dreams of becoming a doctor.'
    },
    {
      name: 'Nethara Aponso',
      age: '9 years',
      region: 'Central Province',
      image: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0157.jpg`,
      description: 'Nethara enjoys painting and wants to be an artist.'
    },
    {
      name: 'Nipuna Weerasooriya',
      age: '8 years',
      region: 'Western Province',
      image: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0156.jpg`,
      description: 'Nipuna loves football and hopes to play professionally.'
    },
  ];

  // If viewing a child profile
  if (selectedChild) {
    return (
      <>
        <Navbar onTabChange={onTabChange} onSponsorClick={onSponsorClick} activeTab={activeTab} />
        <ViewChildProfile
          child={selectedChild}
          onBack={() => setSelectedChild(null)}
        />
        <Footer />
      </>
    );
  }

  // If in donation mode
  if (donationChild) {
    return (
      <>
        <Navbar onTabChange={onTabChange} onSponsorClick={onSponsorClick} activeTab={activeTab} />
        <Donation
          child={donationChild}
          onBack={() => setDonationChild(null)}
        />
        <Footer />
      </>
    );
  }

  // Default: show children list
  return (
    <>
      <Navbar onTabChange={onTabChange} onSponsorClick={onSponsorClick} activeTab={activeTab} />

      <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Hero Image */}
        <div style={{ marginBottom: '50px' }}>
          <img
            src={`${import.meta.env.BASE_URL}img/sponsor.JPG`}
            alt="Support A Child"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        {/* Children Profiles */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {children.map((child, index) => (
            <div
              key={index}
              style={{
                width: '300px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '20px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <img
                src={child.image}
                alt={child.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '15px',
                }}
              />
              <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 'bold' }}>
                Name - {child.name}<br />
                Age - {child.age}<br />
                Region - {child.region}
              </p>
              <button
                style={{
                  backgroundColor: '#f1c40f',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
                onClick={() => setDonationChild(child)}
              >
                Donate
              </button>
              <br />
              <button
                style={{
                  backgroundColor: '#3498db',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedChild(child)}
              >
                Click To View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SupportAChild;
