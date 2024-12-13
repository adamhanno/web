// /src/api/userData.js
export const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/userdata');  // Replace with actual API URL
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  