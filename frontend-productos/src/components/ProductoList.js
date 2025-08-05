import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto,getImage } from '../services/productoService';
import ProductoForm from './ProductoForm';
import './ProductoList.css';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const response = await getProductos();
    setProductos(response.data.productos);
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    fetchProductos();
  };

  const goToProduct = (producto) => {
    window.location.href = "/producto/" + producto;
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Lista de Productos</h2>
      <div className="product-form">
        <ProductoForm fetchProductos={fetchProductos} />
      </div>
      <ul className="product-list">
        {console.log(productos)}
        {productos.map(producto => (
          <li
            key={producto._id}
            className={`product-item ${hoveredId === producto._id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredId(producto._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => goToProduct(producto._id)}
          >
            {producto.imagen && <img src={getImage(producto.imagen)} alt={producto.nombre} className="product-image" />}
            <div className="product-info">
              <span className="product-name">
                {producto.nombre}
              </span>
              <span className="product-description">{producto.descripcion}</span>
            </div>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el click en el botón también active el onClick del li
                handleDelete(producto._id);
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoList;
