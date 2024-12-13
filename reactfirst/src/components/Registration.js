import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and register forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // Added confirmPassword
  const [role, setRole] = useState('user');  // New state to store the user's role (either 'user' or 'admin')
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);  // To track if email is already registered
  const [users, setUsers] = useState([]);  // Store users as an array of objects with email, password, and role

  const navigate = useNavigate();  // Use the useNavigate hook for redirection

  // Load users from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handle the Registration Form
  const handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if the email is already registered
    if (users.some(user => user.email === email && user.role === role)) {
      setIsRegistered(true); // Set the state to show "already registered" message
      return;
    } else {
      // Add the new user to the array with a role
      const newUsers = [...users, { email, password, role }];
      setUsers(newUsers);

      // Save the new users list to localStorage
      localStorage.setItem('users', JSON.stringify(newUsers));

      alert(`Registration successful for ${email}`);
      setError(''); // Clear any previous error message
      setIsRegistered(false);  // Reset isRegistered state
      navigate(role === 'admin' ? '/adminPage' : '/userPage');  // Redirect based on role
    }
  };

  // Handle the Login Form
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the email and password match any registered user
    const user = users.find(user => user.email === email && user.password === password && user.role === role);

    if (user) {
      // Simulate successful login
      alert('Login successful');
      setError(''); // Clear any previous error message
      navigate(user.role === 'admin' ? '/adminPage' : '/userPage');  // Redirect based on role
    } else {
      setError('Invalid credentials'); // Show error message on failed login
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>
          {isLogin ? 'Login to Your Account' : 'Register for the Conference'}
        </h1>

        {error && <p style={styles.errorMessage}>{error}</p>} {/* Display error if exists */}

        {isRegistered ? (
          <div style={styles.registeredMessage}>
            <p>This email is already registered. Please <a href="/login" style={styles.loginLink}>Login</a></p>
          </div>
        ) : (
          isLogin ? (
            <form onSubmit={handleLogin} style={styles.form}>
              <label style={styles.label}>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Role
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  style={styles.input}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <button type="submit" style={styles.button}>Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={styles.form}>
              <label style={styles.label}>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Role
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  style={styles.input}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <button type="submit" style={styles.button}>Register</button>
            </form>
          )
        )}

        {!isRegistered && (
          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={styles.toggleButton}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

// Inline styles (same as your original styles)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
  toggleText: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
  },
  toggleButton: {
    background: 'none',
    color: '#007BFF',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline',
  },
  registeredMessage: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#FF0000',
  },
  loginLink: {
    color: '#007BFF',
    textDecoration: 'underline',
  },
};

export default Registration;
