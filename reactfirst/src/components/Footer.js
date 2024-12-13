import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>&copy; 2024 Conference. All rights reserved.</p>
    </footer>
  );
}

// Inline styles
const styles = {
  footer: {
   
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height : '0.1em',
  },
  text: {
    margin: '0',
    fontSize: '12px',
    color :'black',
  },
};

export default Footer;
