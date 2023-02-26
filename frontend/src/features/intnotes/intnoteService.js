import axios from 'axios';

const API_URL = '/api/interviews/';

// get ticket notes
const getIntNotes = async (interviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + interviewId + '/intnotes', config);

  return response.data;
};
//crete project note
const createIntNote = async (intnoteText, interviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + interviewId + '/intnotes',
    { text: intnoteText },
    config
  );

  return response.data;
};

const intnoteService = {
  getIntNotes,
  createIntNote,
};

export default intnoteService;
