import React, { useState, useEffect } from 'react';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);  // State to hold session data
  const [loading, setLoading] = useState(true);   // State to manage loading status
  const [error, setError] = useState(null);       // State to manage error

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data');  // Backend API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSessions(data);  // Update state with fetched data
      } catch (error) {
        setError(error.message);  // Set error message if fetching fails
      } finally {
        setLoading(false);  // Set loading to false after fetching is done
      }
    };

    fetchData();  // Call fetchData function when the component mounts
  }, []);  // Empty array means this runs once when the component is mounted

  // Handle case where there is no data or error occurs
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Sessions Data</h1>
      <table>
        <thead>
          <tr>
            <th>Speaker</th>
            <th>Title</th>
            <th>Description</th>
            <th>Session</th>
            <th>Time</th>
            <th>Tags</th>
            <th>Ratings</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session.speaker}</td>
              <td>{session.title}</td>
              <td>{session.description}</td>
              <td>{session.session}</td>
              <td>{session.time}</td>
              <td>{session.tags.join(', ')}</td>
              <td>{session.ratings.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sessions;
