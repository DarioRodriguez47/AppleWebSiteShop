// components/ProductoForm.js

import React, { useState } from 'react';
import { saveProducto, updateProducto, uploadImage } from '../services/productoService';
import './ProductoForm.css';

const ProductoForm = ({ producto, isEdit, fetchProductos }) => {
  const [formData, setFormData] = useState({
    nombre: producto?.nombre || '',
    descripcion: producto?.descripcion || '',
    edicion: producto?.edicion || '',
    anio: producto?.anio || '',
    precio: producto?.precio || '',
    imagen: producto?.imagen || null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateProducto(producto._id, formData);
    } else {
      const response = await saveProducto(formData);
      console.log(response.data)
      if (formData.imagen) {
        const imageFormData = new FormData();
        imageFormData.append('imagen', formData.imagen);
        await uploadImage(response.data.libro._id, imageFormData);
      }
    }
    fetchProductos();
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input 
        type="text" 
        name="nombre" 
        value={formData.nombre} 
        onChange={handleChange} 
        placeholder="Nombre" 
        className="form-input" 
      />
      <input 
        type="text" 
        name="descripcion" 
        value={formData.descripcion} 
        onChange={handleChange} 
        placeholder="Descripción" 
        className="form-input" 
      />
      <input 
        type="text" 
        name="edicion" 
        value={formData.edicion} 
        onChange={handleChange} 
        placeholder="Edición" 
        className="form-input" 
      />
      <input 
        type="number" 
        name="anio" 
        value={formData.anio} 
        onChange={handleChange} 
        placeholder="Año" 
        className="form-input" 
      />
      <input 
        type="number" 
        name="precio" 
        value={formData.precio} 
        onChange={handleChange} 
        placeholder="Precio" 
        className="form-input" 
      />
      <input 
        type="file" 
        name="imagen" 
        onChange={handleImageChange} 
        className="form-input" 
      />
      <button 
        type="submit" 
        className="submit-button"
      >
        Guardar
      </button>
    </form>
  );
};

export default ProductoForm;
