import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export const updateVotes = async ({ id, votes }) => {
  const response = await axios.patch(`${baseUrl}/${id}`, { votes });
  return response.data;
};
