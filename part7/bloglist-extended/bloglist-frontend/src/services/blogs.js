import axios from 'axios';
const baseUrl = '/api/blogs';

const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return null;
};

const getAll = () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(baseUrl, config).then(response => response.data).catch(error => {
    console.error("Error fetching blogs: ", error.response);
    throw error;
  });
};

const getById = (id) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${baseUrl}/${id}`, config).then(res => res.data).catch(error => {
    console.error("Error fetching blog by ID: ", error.response);
    throw error;
  });
};

const create = (newBlog) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(baseUrl, newBlog, config).then(response => response.data).catch(error => {
    console.error("Error creating blog: ", error.response);
    throw error;
  });
};

const update = (id, updatedBlog) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${baseUrl}/${id}`, updatedBlog, config).then(response => response.data).catch(error => {
    console.error("Error updating blog: ", error.response);
    throw error;
  });
};

const remove = (id) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${baseUrl}/${id}`, config).then(response => response.data).catch(error => {
    console.error("Error deleting blog: ", error.response);
    throw error;
  });
};

const comment = (id, comment) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${baseUrl}/${id}/comments`, { comment }, config).then(res => res.data).catch(error => {
    console.error("Error adding comment: ", error.response);
    throw error;
  });
};

export default { getAll, getById, create, update, remove, comment };
