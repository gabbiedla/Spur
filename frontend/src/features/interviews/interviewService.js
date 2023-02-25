import axios from 'axios';

const API_URL = '/api/interviews/';

// Create new project

const createInterview = async (interviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, interviewData, config);

  return response.data;
};
// get user prjects
const getInterviews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// get user project
const getInterview = async (interviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + interviewId, config);

  return response.data;
};

const interviewService = {
  createInterview,
  getInterviews,
  getInterview,
};

export default interviewService;
