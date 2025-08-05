// components/ProductoEdit.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducto, updateProducto, uploadImage } from "../services/productoService";
import './ProductoEdit.css'; // Importar el archivo de estilos

const ProductoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    edicion: "",
    anio: "",
    precio: "",
    imagen: null,
  });

  useEffect(() => {
    fetchProducto();
  }, []);

  const fetchProducto = async () => {
    const response = await getProducto(id);
    setFormData(response.data.producto);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagen: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProducto(id, formData);
    if (formData.imagen) {
      const imageFormData = new FormData();
      imageFormData.append("imagen", formData.imagen);
      console.log(response.data)
      await uploadImage(response.data.libroUpdated._id, imageFormData);
    }
    navigate(`/producto/${id}`);
  };

  const handleBackClick = () => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Editar Producto</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">
          Guardar Cambios
        </button>
        <button type="button" className="back-button" onClick={handleBackClick}>
          Volver al Detalle
        </button>
      </form>
    </div>
  );
};

export default ProductoEdit;
