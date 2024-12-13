import React, { useState } from 'react';

const CreateSchedule = ({ availableTalks }) => {
  const [schedule, setSchedule] = useState([]);

  const addTalkToSchedule = (talk) => {
    const timeConflict = schedule.some(scheduledTalk => scheduledTalk.time === talk.time);
    if (timeConflict) {
      alert('You already have a talk scheduled at this time.');
    } else {
      setSchedule([...schedule, talk]);
    }
  };

  const removeTalkFromSchedule = (talkId) => {
    setSchedule(schedule.filter(talk => talk.id !== talkId));
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '20px',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    talkList: {
      listStyleType: 'none',
      padding: '0',
    },
    talkItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    talkInfo: {
      fontSize: '16px',
    },
    button: {
      padding: '5px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    buttonRemove: {
      backgroundColor: '#dc3545',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    buttonRemoveHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Your Schedule</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Available Talks</h3>
        {availableTalks && availableTalks.length > 0 ? (
          <ul style={styles.talkList}>
            {availableTalks.map(talk => (
              <li key={talk.id} style={styles.talkItem}>
                <div style={styles.talkInfo}>
                  <strong>{talk.title}</strong> by {talk.speaker} (Session {talk.session}) at {talk.time}
                </div>
                <button
                  style={styles.button}
                  onClick={() => addTalkToSchedule(talk)}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                  Add to Schedule
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available talks at the moment.</p>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Schedule</h3>
        {schedule.length === 0 ? (
          <p>No talks scheduled yet.</p>
        ) : (
          <ul style={styles.talkList}>
            {schedule.map(talk => (
              <li key={talk.id} style={styles.talkItem}>
                <div style={styles.talkInfo}>
                  <strong>{talk.title}</strong> by {talk.speaker} (Session {talk.session}) at {talk.time}
                </div>
                <button
                  style={{ ...styles.button, ...styles.buttonRemove }}
                  onClick={() => removeTalkFromSchedule(talk.id)}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonRemoveHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.buttonRemove.backgroundColor}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateSchedule;
