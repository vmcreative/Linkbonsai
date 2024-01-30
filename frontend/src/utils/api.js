// frontend/src/utils/api.js

const api = process.env.REACT_APP_API;

export const loginUser = async (formData) => {
  const response = await fetch(`${api}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return response;
};

export const fetchUserData = async (token) => {
  const response = await fetch(`${api}/users/id`, {
    headers: { Authorization: token }
  });
  return response;
};

export const editUser = async (formData, session) => {
  const formatted = { ...formData };
  for (const key in formatted) {
    if (formatted[key] === '') formatted[key] = null;
  }

  const response = await fetch(`${api}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session,
    },
    body: JSON.stringify(formatted),
  });
  return response;
};

export const addItem = async (formData, session) => {
  const response = await fetch(`${api}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session,
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const editItem = async (formData, session) => {
  const response = await fetch(`${api}/items`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session,
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const deleteItem = async (formData, session) => {
  const response = await fetch(`${api}/items`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session,
    },
    body: JSON.stringify(formData),
  });
  return response;
};