// components/ProductoDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducto, getImage } from '../services/productoService';
import './ProductoDetail.css'; // Importar el archivo de estilos

const ProductoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetchProducto();
  }, []);

  const fetchProducto = async () => {
    const response = await getProducto(id);
    setProducto(response.data.producto);
  };

  if (!producto) return <div className="loading">Cargando...</div>;

  const handleBackClick = () => {
    navigate('/'); // Navegar al inicio
  };

  const handleEditClick = () => {
    navigate(`/producto/editar/${id}`); // Navegar a la página de edición del producto
  };

  return (
    <div className="detail-container">
      <h2 className="detail-title">{producto.nombre}</h2>
      <p className="detail-description">{producto.descripcion}</p>
      <p className="detail-info">Edición: {producto.edicion}</p>
      <p className="detail-info">Año: {producto.anio}</p>
      <p className="detail-info">Precio: ${producto.precio}</p>
      {producto.imagen && <img src={getImage(producto.imagen)} alt={producto.nombre} className="detail-image" />}
      <div className="detail-buttons">
        <button className="detail-button" onClick={handleBackClick}>Volver al Inicio</button>
        <button className="detail-button" onClick={handleEditClick}>Editar Producto</button>
      </div>
    </div>
  );
};

export default ProductoDetail;
