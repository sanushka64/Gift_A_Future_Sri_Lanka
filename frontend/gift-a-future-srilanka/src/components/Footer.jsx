import React from 'react';

function Footer() {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#e9f1f4',
      padding: '60px 0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '600', fontSize: '24px', marginBottom: '25px' }}>Follow Us</h2>

        <div style={{ marginBottom: '40px' }}>
          <a
  href="https://www.instagram.com/amshixx__?utm_source=ig_web_button_share_sheet&igsh=ZXVvcTViMnAzazA3"
  target="_blank"
  rel="noopener noreferrer"
  style={{ margin: '0 20px' }}
>
  <img
    src="https://img.icons8.com/color/64/instagram-new.png"
    alt="Instagram"
  />
</a>

          <a
  href="https://www.facebook.com/share/1CCxVG5KHW/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ margin: '0 20px' }}
>
  <img
    src="https://img.icons8.com/color/64/facebook-new.png"
    alt="Facebook"
  />
</a>

          <a href="#" style={{ margin: '0 20px' }}>
            <img src="https://img.icons8.com/color/64/youtube-play.png" alt="YouTube" />
          </a>
        </div>

        <h2 style={{ fontWeight: '600', fontSize: '22px', marginBottom: '15px' }}>Contact Us Email</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
          info@giftafuturesrilanka.org <br />
          Gift a Future Sri Lanka, Galle Road, Colombo 03 <br />
          0772764664
        </p>

        <p style={{ fontSize: '16px', marginTop: '35px', color: '#555' }}>
          &copy; 2025 Gift a Future Sri Lanka. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
