import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductoList from "./components/ProductoList";
import ProductoForm from "./components/ProductoForm";
import ProductoDetail from "./components/ProductoDetail";
import { useState } from "react";
import { getProductos } from "./services/productoService";
import ProductoEdit from "./components/ProductoEdit";
import AppleProducts from "./components/ProductosApple";
import "./index.css"
const App = () => {
  const [productos, setProductos] = useState(null);

  const fetchProductos = async () => {
    const response = await getProductos();
    setProductos(response.data.productos);
  };

  return (
    <Routes>
      <Route path="/productos" element={<AppleProducts/>} />
      <Route path="/" element={<ProductoList />} />
      <Route path="/crear-producto" element={<ProductoForm fetchProductos={fetchProductos} />} />
      <Route path="/producto/:id" element={<ProductoDetail />} />
      <Route path="/producto/editar/:id" element={<ProductoEdit />} />
    </Routes>
  );
};

export default App;
