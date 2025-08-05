// services/AuthService.js

import axios from 'axios';

const API_URL = 'http://localhost:3600'; // Cambia la URL según tu configuración

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al registrarse');
  }
};
