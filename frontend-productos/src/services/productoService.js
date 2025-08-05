import axios from 'axios';

const API_URL = 'http://localhost:3600';

export const getProductos = async () => {
  return await axios.get(`${API_URL}/productos`);
};

export const getProducto = async (id) => {
  return await axios.get(`${API_URL}/producto/${id}`);
};

export const saveProducto = async (producto) => {
  return await axios.post(`${API_URL}/guardar-producto`, producto);
};

export const updateProducto = async (id, producto) => {
  return await axios.put(`${API_URL}/producto/${id}`, producto);
};

export const deleteProducto = async (id) => {
  return await axios.delete(`${API_URL}/producto/${id}`);
};

export const uploadImage = async (id, formData) => {
  return await axios.post(`${API_URL}/subir-imagen/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getImage = (imageName) => {
  return `${API_URL}/get-imagen/${imageName}`;
};


