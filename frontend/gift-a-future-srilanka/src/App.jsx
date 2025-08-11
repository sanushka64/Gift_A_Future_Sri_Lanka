import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RegistrationForm from './RegistrationForm';
import Footer from './components/Footer';
import SuccessStories from './SuccessStories';
import About from './About';
import SignIn from './SignIn';
import SupportAChild from './SupportAChild';
import './App.css';

function App() {
  const [showSponsorUI, setShowSponsorUI] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  

  const handleSponsorClick = () => {
    setShowSponsorUI(true);
    setActiveTab('Corporate Register');
  };

  useEffect(() => {
    if (showSponsorUI) {
      const el = document.getElementById('sponsor-ui');
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [showSponsorUI]);

  const handleTabChange = (tab) => {
    if (tab === 'Corporate Register') {
      handleSponsorClick();
    } else {
      setShowSponsorUI(false);
    }
    setActiveTab(tab);
  };

  // Render Stories full-screen with its own Navbar/Footer
  // Render Success Stories full-screen

if (activeTab === 'Stories') {
  return (
    <SuccessStories
      onTabChange={handleTabChange}
      onSponsorClick={handleSponsorClick}
      activeTab={activeTab}
    />
  );
}

// Render About full-screen
if (activeTab === 'About') {
  return (
    <About
      onTabChange={handleTabChange}
      onSponsorClick={handleSponsorClick}
      activeTab={activeTab}
    />
  );
}
if (activeTab === 'Sign In') {
  return (
    <SignIn
      onTabChange={handleTabChange}
      onSponsorClick={handleSponsorClick}
      activeTab={activeTab}
    />
  );
}
if (activeTab === 'Support A Child') {
  return (
    <SupportAChild
      onTabChange={handleTabChange}
      onSponsorClick={handleSponsorClick}
      activeTab={activeTab}
    />
  );
}


  return (
    <>
      <Navbar
        onSponsorClick={handleSponsorClick}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />

      {showSponsorUI ? (
        <div id="sponsor-ui">
          <RegistrationForm />
        </div>
      ) : (
      
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Entire Landing Page */}
        <div
          style={{
            paddingTop: "100px",
            padding: "20px",
          }}
        >
        {/* Header Image */}
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0144.jpg`}
            alt=""
            style={{ width: '120%', height: 'auto', borderRadius: '8px' }}
          />
        </div>

        {/* Title and Description */}
        <h1
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontWeight: 'bold',
            fontSize: '2.5rem',
          }}
        >
          Gift a Future Sri Lanka
        </h1>

        <div className="text-center px-6 py-8">
  <p className="mb-4">
    Gift a Future Sri Lanka is a heart-driven initiative that aims to uplift vulnerable children across Sri Lanka by providing them with the essential tools they need to lead empowered and meaningful lives. In a country where many children still face poverty, lack of access to education, and unstable living conditions, we step in to create a bridge between compassion and action.
  </p>
  <p className="mb-4">
    At its core, Gift a Future is built on the belief that every child deserves a chance—regardless of where they were born or what challenges they face. We work tirelessly to connect kind-hearted donors, sponsors, NGOs, and well-wishers with underprivileged children and struggling communities. Our goal is to provide them with access to:
  </p>
  <ul className="list-disc text-left inline-block mb-4">
    <li><strong>Quality Education:</strong> Supplying school materials, covering tuition costs, and supporting educational development.</li>
    <li><strong>Safe Shelter:</strong> Assisting with housing, infrastructure, and child-friendly living environments.</li>
    <li><strong>Nutrition & Healthcare:</strong> Ensuring basic needs like food, clean water, and medical care are met.</li>
    <li><strong>Emotional and Social Support:</strong> Encouraging mental wellness and a sense of belonging for every child we support.</li>
  </ul>
  <p className="mb-4">
    Through our user-friendly donation platform, individuals and organizations can directly support specific children, projects, or causes—bringing full transparency to where contributions go. Every rupee, every gesture, and every act of kindness becomes a seed for a better tomorrow.
  </p>
  <p className="mb-4">
    We envision a future where no child in Sri Lanka is left behind—where they are free to dream, free to learn, and free to become the best version of themselves. With your support, we can make that vision a reality.
  </p>
  <p className="font-semibold italic">Join us. Gift a smile. Gift a hope. Gift a future.</p>
</div>


        <div style={{ maxWidth: '700px', margin: '40px auto', textAlign: 'center' }}>
  {/* Call to Action Clickable Text */}
  <p
    style={{
      color: '#3498db',
      textDecoration: 'underline',
      marginBottom: '30px',
      fontWeight: 'bold',
      fontSize: '20px',
    }}
  >
    Sponsor A Child
  </p>

  {/* Sponsor Card */}
  <div
    style={{
      backgroundColor: '#3498db',
      borderRadius: '20px',
      padding: '40px',
      color: '#fff',
    }}
  >
    {/* Image Banner */}
    <img
      src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0059.jpg`} // Replace with your image path
      alt="Sponsor Children"
      style={{
        width: '100%',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        objectFit: 'cover',
        marginBottom: '30px',
        height: '400px',
        maxHeight: '100%',
      }}
    />

    {/* Donate Button */}
    <button
      style={{
        backgroundColor: '#f1c40f',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '6px',
        padding: '18px 36px',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s ease',
      }}
      onClick={() => setActiveTab('Support A Child')}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d4ac0d')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f1c40f')}
    >
      DONATE
    </button>
  </div>
</div>



        {/* Coporate Details */}
        <div style={{ maxWidth: '700px', margin: '40px auto', textAlign: 'center' }}>
  {/* Call to Action Clickable Text */}
  <p
    style={{
      color: '#3498db',
      textDecoration: 'underline',
      marginBottom: '30px',
      fontWeight: 'bold',
      fontSize: '20px',
    }}
  >
    Register with us as Our Corporate Partners
  </p>

  {/* Sponsor Card */}
  <div
    style={{
      backgroundColor: '#3498db',
      borderRadius: '20px',
      padding: '40px',
      color: '#fff',
    }}
  >
    {/* Image Banner */}
    <img
      src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0147.jpg`}
 // Replace with your image path
      alt="Sponsor Children"
      style={{
        width: '100%',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        objectFit: 'cover',
        marginBottom: '30px',
        height: '400px',
        maxHeight: '100%',
      }}
    />

    {/* Donate Button */}
  <button
  style={{
    backgroundColor: '#f1c40f',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    padding: '18px 36px',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease',
  }}
  onClick={() => setShowSponsorUI(true)}  // <== here trigger showing RegistrationForm
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d4ac0d')}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f1c40f')}
>
  Register For A Gift a Future
</button>

  </div>
</div>
 {/* Count Image */}
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0148.jpg`}
            alt="Descriptive Alt Text"
            style={{ width: '120%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
{/* Success Story */}
<p
  style={{
    color: '#3498db',
    textDecoration: 'underline',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '22px',
    textAlign: 'center',
  }}
>
  Our Success Stories
</p>

<div
  style={{
    backgroundColor: '#3498db',
    borderRadius: '25px',
    padding: '50px',
    maxWidth: '900px', // ⬅️ Increased width
    margin: '0 auto 60px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  {/* Content Row */}
  <div
    style={{
      display: 'flex',
      width: '100%',
      gap: '30px',
      marginBottom: '40px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    {/* Image */}
    <img
      src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0149.jpg`}
 // Replace with your image path
      alt="Gayathra"
      style={{
        width: '400px',         // ⬅️ Increased size
        height: '400px',
        borderRadius: '15px',
        objectFit: 'cover',
        flexShrink: 0,
      }}
    />

    {/* Text */}
    <p
      style={{
        fontSize: '18px',       // ⬅️ Slightly larger text
        lineHeight: '1.8',
        color: '#fff',
        margin: 0,
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold', 
      }}
    >
     Gayathra, a 10-year-old boy with severe malnutrition, was brought into our program by a local shelter. With your support, we provided monthly nutritional packs, vitamins, and access to proper medical care. Six months later, Gayathra is smiling, gaining weight, and even playing cricket again with his friends.
    </p>
  </div>

  {/* Button */}
  <button
    style={{
      backgroundColor: '#f1c40f',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      padding: '20px 40px',
      fontSize: '20px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      transition: 'background-color 0.3s ease',
      width: '100%',
      maxWidth: '300px',
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d4ac0d')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f1c40f')}
    onClick={() => setActiveTab('Stories')}
  >
    Stories and Updates
  </button>
</div>

{/* About Us */}
<p
  style={{
    color: '#3498db',
    textDecoration: 'underline',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '22px',
    textAlign: 'center',
  }}
>
  About Us
</p>
<div
          style={{
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0146.jpg`}
            alt="Descriptive Alt Text"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
<div
  style={{
    backgroundColor: '#3498db',
    borderRadius: '25px',
    padding: '50px',
    maxWidth: '900px', 
    margin: '0 auto 60px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  {/* Content Row */}
  <div
    style={{
      display: 'flex',
      width: '100%',
      gap: '30px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  ></div>
  {/* Text */}
    <p
      style={{
        fontSize: '18px',       
        lineHeight: '1.8',
        color: '#fff',
        margin: 0,
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold', 
      }}
    >
     Gift a Future Sri Lanka is a non-profit initiative committed to transforming the lives of underprivileged children across Sri Lanka. Our mission is to ensure every child has access to education, shelter, nutrition, and emotional support—regardless of their background or circumstances.
We partner with kind-hearted donors, schools, NGOs, and local shelters to deliver transparent, impactful support where it’s needed most. From providing school supplies and safe housing to healthcare and mentorship, we believe in empowering children with real opportunities.
Together, we don’t just give—they grow, they dream, and they thrive.
    </p>
  </div>

        
       </div>
      </div>
    )}

    <Footer />
  </>
);
}

export default App;