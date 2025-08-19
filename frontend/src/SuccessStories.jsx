import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function StoryCard({ image, alt, title, text }) {
  const isBehanStory = title === "Behan Gunewardhana’s Path to Leadership";

  return (
    <div
      style={{
        backgroundColor: isBehanStory ? '#f1c40f' : '#3498db',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '700px',
        margin: '0 auto 40px',
        color: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: '30px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <img
          src={image}
          alt={alt}
          style={{
            width: '280px',
            height: 'auto',
            maxHeight: '320px',
            borderRadius: '15px',
            objectFit: 'cover',
            flexShrink: 0,
            alignSelf: 'center',
          }}
        />
        <div style={{ flex: 1 }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: '15px',
              fontSize: '20px',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#fff',
              margin: 0,
              textAlign: 'left',
              whiteSpace: 'pre-line',
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessStories({ onTabChange, onSponsorClick, activeTab }) {
  // ✅ Scroll to top on load
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, []);

  const stories = [
    {
      image: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0152.jpg`,
      alt: 'Behan',
      title: 'Behan Gunewardhana’s Path to Leadership',
      text: `Behan, a bright 12-year-old from the Southern Province, joined our initiative two years ago. At the time, he struggled with school attendance due to a lack of supplies and support at home.

Through the program, Behan received consistent mentorship, school essentials, and encouragement from his sponsor. His teachers noted a dramatic improvement in both his academics and confidence.

This year, Behan was elected class monitor by his peers. He now dreams of becoming a teacher so he can help children the way he was helped. His story is a testament to what sustained care and opportunity can achieve.`,
    },
    {
      image: `${import.meta.env.BASE_URL}img/IMG-20250731-WA0149.jpg`,
      alt: 'Gayathra',
      title: 'Gayathra’s Journey: From Malnutrition to Joyful Recovery',
      text: `Gayathra, a 10-year-old boy, came into our program through a referral from a local shelter. When he first arrived, he was painfully thin, weak, and barely had the energy to speak. His condition was the result of prolonged malnutrition and lack of access to even the most basic medical support.

Thanks to your generous support, we were able to provide Gayathra with monthly nutritional packs rich in essential calories and proteins, a steady supply of vitamins, and regular check-ups from our medical team. Slowly but surely, his transformation began. His appetite returned, his energy increased, and the sparkle came back to his eyes.

Six months later, Gayathra is not only gaining weight steadily—he’s thriving. He runs, laughs, and plays cricket every evening with the neighborhood kids. His teachers say he’s more attentive in class, and his confidence has grown tremendously.

Gayathra’s story is a powerful reminder that even the smallest acts of kindness can lead to life-changing outcomes.`,
    },
  ];

  return (
    <>
      <Navbar
        onTabChange={onTabChange}
        onSponsorClick={onSponsorClick}
        activeTab={activeTab}
      />

      <div style={{ paddingTop: '10px', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.2rem',
            color: '#3498db',
            fontWeight: 1500,
            marginBottom: '30px',
            textDecoration: 'underline',
          }}
        >
          Success Stories
        </h1>

        {stories.map((story, index) => (
          <StoryCard key={index} {...story} />
        ))}

        <h2
          style={{
            textAlign: 'center',
            color: '#3498db',
            fontWeight: 'bold',
            fontSize: '20px',
            textDecoration: 'underline',
            marginTop: '60px',
            marginBottom: '20px',
          }}
        >
          Updates
        </h2>

        <div
          style={{
            backgroundColor: '#f1c40f',
            borderRadius: '20px',
            padding: '25px 30px',
            maxWidth: '700px',
            margin: '0 auto 60px',
            color: '#000',
            fontFamily: 'sans-serif',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <li>
              <strong>✅ 50+ Children Matched with Sponsors in Q2</strong>
              <br />
              We are thrilled to announce that over 50 children across Sri Lanka have been matched with generous sponsors in the last quarter! Your continued support is helping children access quality education, daily essentials, and medical care.
            </li>
            <li>
              <strong>🎒 Back-to-School Kits Distributed</strong>
              <br />
              Thanks to your donations, we’ve distributed custom back-to-school kits (uniforms, bags, shoes, and supplies) to children in the Central, Northern, and Uva provinces. These essentials empower children to attend school with confidence.
            </li>
            <li>
              <strong>📖 Success Story Spotlight: Vidusha Senevirathna</strong>
              <br />
              Meet Vidusha, an 11-year-old girl from the Central Province, who is now excelling in school thanks to our sponsorship program. Read her full story on our Success Stories page.
            </li>
            <li>
              <strong>🆕 New Child Profiles Added</strong>
              <br />
              Over 15 new profiles have been added to the “View Children” section. Each child is waiting for a sponsor to change their future. Visit the page and consider supporting a child in need.
            </li>
            <li>
              <strong>📍 Community Outreach Events Held</strong>
              <br />
              In June, we held 3 outreach programs in Kandy, Anuradhapura, and Galle, reaching over 200 families. These sessions provided guidance on education, nutrition, and applying to our aid programs.
            </li>
            <li>
              <strong>🛠️ Upcoming Features</strong>
              <br />
              • A donor dashboard to track your sponsorship impact
              <br />
              • Volunteer signup portal launching in August
              <br />
              • Sinhala and Tamil versions of the website coming soon
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}
