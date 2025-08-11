import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./RegistrationForm.css"; // Reusing layout styles

export default function About({ onTabChange, onSponsorClick, activeTab }) {
  return (
    <>
      <Navbar
        onTabChange={onTabChange}
        onSponsorClick={onSponsorClick}
        activeTab={activeTab}
      />

      <div className="container" style={{ paddingTop: "60px", paddingBottom: "60px", display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
        {/* Left side images */}
        <div className="image-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', flex: 1 }}>
          <img
            src={`${import.meta.env.BASE_URL}img/about01.jpg`}
            alt="Join With Us"
            className="image"
            style={{ width: '100%', borderRadius: '15px', objectFit: 'cover' }}
          />
          <img
            src={`${import.meta.env.BASE_URL}img/about02.jpg`}
            alt="Gift a Future"
            className="image"
            style={{ width: '100%', borderRadius: '15px', objectFit: 'cover' }}
          />
        </div>

        {/* Right side yellow box */}
        <div
          style={{
            backgroundColor: "#f1c40f",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "700px",
            flex: 2,
            color: "#000",
            fontSize: "16px",
            lineHeight: "1.8",
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontWeight: 900,
              fontSize: "28px",
              color: "#000",
              marginBottom: "25px",
              textDecoration: "underline",
            }}
          >
            About Us
          </h2>

          <p>
            <strong>Gift A Future Sri Lanka</strong> was born out of a simple idea: that no child should have to suffer because of where they were born. From humble beginnings, we have grown into a grassroots movement dedicated to transforming the lives of underprivileged children across the island.
          </p>

          <p>
            Our journey began in a small community in the Southern Province, where we delivered food packs to five children during a school holiday. That single act of kindness sparked something much bigger. Today, we support over 300 children monthly with essential needs — but more importantly, with hope.
          </p>

          <p>
            We focus on holistic care: nutritious food, access to clean water, medical checkups, school supplies, mentorship, and emotional healing. Every child is seen, heard, and supported — not as a statistic, but as an individual with dreams.
          </p>

          <p>
            <strong>Our values are simple but powerful:</strong> compassion, accountability, and empowerment. We work hand in hand with families and communities, not just giving charity, but building resilience and self-worth in every child we help.
          </p>

          <p>
            Our network of 120+ volunteers includes teachers, counselors, nurses, university students, and working professionals who dedicate their weekends to site visits, tutoring sessions, and child wellness checks. Many of them were once beneficiaries themselves — now giving back.
          </p>

          <p>
            One such volunteer is Dinushi, a former sponsored child who now leads our educational outreach in the Central Province. “This program gave me my future,” she says. “Now it’s my turn to help someone else see theirs.”
          </p>

          <p>
            <strong>We are transparent and lean.</strong> 93% of donations go directly to field operations. We publish monthly reports and impact summaries so every sponsor sees exactly where their contribution goes — and the faces it touches.
          </p>

          <p>
            Looking ahead, we are launching our <em>Child Guardian Network</em> — a digital platform that connects sponsors more closely with the children they support through updates, letters, and photos. We believe relationships create lasting change.
          </p>

          <p>
            <strong>Our mission is long-term:</strong> to break cycles of poverty by addressing not only immediate needs but the root causes of vulnerability. It’s about planting seeds today that grow into forests tomorrow.
          </p>

          <p>
            If you’re reading this, you’re already part of the movement. Your belief in children, in second chances, and in community healing fuels everything we do. Together, we can build a Sri Lanka where every child feels safe, seen, and supported.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
