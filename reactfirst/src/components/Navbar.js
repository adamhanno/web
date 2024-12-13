import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // For navigation programmatically

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the "BrowseTalks" page with search query as a URL parameter
      navigate(`/browsetalks?search=${searchQuery}`);
    }
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    position: 'relative',
    flexWrap: 'wrap',
  };

  const logoStyle = {
    margin: 0,
  };

  const navLinksStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
  };

  const navLinkStyle = {
    marginRight: '20px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  };

  const linkHoverStyle = {
    color: '#ff6347', // Tomato color for hover effect
  };

  const searchFormStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    padding: '5px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: '#ff6347',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e55342',
  };

  // Mobile responsive styles
  const mobileStyle = {
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const mobileLinksStyle = {
    flexDirection: 'column',
    marginTop: '20px',
  };

  const mobileLinkStyle = {
    margin: '10px 0',
  };

  const mobileSearchFormStyle = {
    width: '100%',
    marginTop: '10px',
  };

  const mobileInputStyle = {
    width: '80%',
    marginRight: '0',
  };

  const mobileButtonStyle = {
    width: '80%',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <h1>My Website</h1>
      </div>
      <ul style={navLinksStyle}>
        <li style={navLinkStyle}><Link to="/" style={linkStyle}>Home</Link></li>
        <li style={navLinkStyle}><Link to="/talks" style={linkStyle}>Talks</Link></li>
        <li style={navLinkStyle}><Link to="/browsetalks" style={linkStyle}>Browse Talks</Link></li>
        <li style={navLinkStyle}><Link to="/createschedule" style={linkStyle}>CreateSchedule</Link></li>
        <li style={navLinkStyle}><Link to="/reviews" style={linkStyle}>Reviews</Link></li>
        <li style={navLinkStyle}><Link to="/registration" style={linkStyle}>Register</Link></li>
        
      </ul>

      {/* Search form */}
      <form style={searchFormStyle} onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search Talks by Speaker" 
          value={searchQuery} 
          onChange={handleSearchChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
