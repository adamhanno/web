import React, { useState, useEffect } from 'react';

function Reviews({ availableTalks }) {
  // State to manage ratings for talks
  const [ratings, setRatings] = useState({});

  // Initialize ratings state based on availableTalks
  useEffect(() => {
    const initialRatings = availableTalks.reduce((acc, talk) => {
      acc[talk.id] = talk.ratings || []; // Initialize with existing ratings or empty array
      return acc;
    }, {});
    setRatings(initialRatings);
  }, [availableTalks]);

  // Submit a new rating for a talk
  const submitRating = (talkId, rating) => {
    setRatings(prevRatings => {
      const updatedRatings = { ...prevRatings };

      // Initialize the ratings array for a talk if it doesn't exist
      if (!updatedRatings[talkId]) {
        updatedRatings[talkId] = [];
      }

      // Add the new rating to the array
      updatedRatings[talkId].push(rating);

      return updatedRatings;
    });
  };

  // Calculate the average rating for a talk
  const calculateAverage = (talkId) => {
    const talkRatings = ratings[talkId] || [];
    if (talkRatings.length === 0) return 'No ratings yet'; // No ratings message
    const sum = talkRatings.reduce((acc, rating) => acc + rating, 0);
    return (sum / talkRatings.length).toFixed(1); // Rounded average to 1 decimal
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Rate the Talks</h1>
      <div style={styles.talksList}>
        {availableTalks.map(talk => (
          <div key={talk.id} style={styles.talk}>
            <h2 style={styles.title}>{talk.title}</h2>
            <p style={styles.description}>{talk.description}</p>

            {/* Rating Dropdown */}
            <select
              onChange={(e) => submitRating(talk.id, parseInt(e.target.value))}
              defaultValue={0}
              style={styles.select}
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>

            {/* Display average rating */}
            <div style={styles.averageRating}>
              <h3>{`Average Rating: ${calculateAverage(talk.id)}`}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  talksList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  talk: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '15px',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  averageRating: {
    marginTop: '15px',
    fontSize: '1.1rem',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default Reviews;