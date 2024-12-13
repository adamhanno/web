export const fetchTalksBySession = async (sessionId) => {
    const response = await axios.get(`${API_URL}/session/${sessionId}`);
    return response.data;
  };
  