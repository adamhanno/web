import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data (such as removing user details from localStorage)
    localStorage.removeItem('users');
    navigate('/');  // Redirect to the homepage or login page
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.header}>Welcome User</h1>
      <p style={styles.content}>This is the user page. You have limited access to the system.</p>
      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: '36px',
    color: '#333',
  },
  content: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#555',
  },
  button: {
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UserPage;
