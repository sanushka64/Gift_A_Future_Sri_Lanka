import React from 'react';

function Navbar({ onSponsorClick, onTabChange, activeTab, isLoggedIn, onLogout }) {
  const menuItems = isLoggedIn
    ? ['Home', 'Stories', 'About', 'Corporate Register', 'Sign Out']
    : ['Home', 'Stories', 'About', 'Corporate Register', 'Sign In'];

  return (
    <nav 
  className="bg-[#e9f1f4] shadow-md" 
  style={{ 
    height: '100px', 
    paddingLeft: 0, 
    paddingRight: '2rem',
    fontWeight: 'normal' // Ensures no bold override
  }}
>

      <div className="h-full flex items-center justify-between">
        {/* Logo */}
        <div className="h-full flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}img/IMG-20250731-WA0146.jpg`}
            alt=""
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Nav links */}
        <div
          className="flex flex-1 max-w-[700px] font-extrabold whitespace-nowrap"
          style={{ justifyContent: 'space-between', gap: '5rem' }}
        >
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (item === 'Sign Out') {
                  onLogout(); // Call logout function
                } else {
                  onTabChange(item);
                }
              }}
              className={`transition ${
                activeTab === item ? 'text-blue-900 underline' : 'text-[#3498db]'
              }`}
              style={{
                textDecoration: 'none',
                fontSize: '26px',
                lineHeight: '100px',
                cursor: 'pointer',
                fontWeight: 900,
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Support A Child button */}
        <div className="flex-shrink-0 ml-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('Support A Child');
            }}
            className="bg-[#3498db] rounded-none hover:bg-[#2d8edb] transition font-extrabold flex flex-col justify-center items-center"
            style={{
              width: '130px',
              height: '80px',
              lineHeight: '1.1',
              textAlign: 'center',
              padding: 0,
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '26px',
              fontWeight: 900,
            }}
          >
            <span>Support A</span>
            <span style={{ marginLeft: '-8px' }}>Child</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
