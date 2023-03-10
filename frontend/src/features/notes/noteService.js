import axios from 'axios';

const API_URL = '/api/projects/';

// get ticket notes
const getNotes = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + projectId + '/notes', config);

  return response.data;
};
//crete project note
const createNote = async (noteText, projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + projectId + '/notes',
    { text: noteText },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
