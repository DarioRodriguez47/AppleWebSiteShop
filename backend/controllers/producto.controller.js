var Producto = require("../models/producto");
var fs = require("fs");
var path = require("path");
var controller = {
  inicio: function (req, res) {
    res.status(200).send({
      message: "<h1>Backend de productos</h1>",
    });
  },

  //Guardar producto
  saveProducto: async function (req, res) {
    try {
      var produto = new Producto();
      var params = req.body;
      produto.nombre = params.nombre;
      produto.descripcion = params.descripcion;
      produto.edicion = params.edicion;
      produto.anio = params.anio;
      produto.precio = params.precio;
      produto.imagen = null;

      var produtoStored = await produto.save();
      if (!produtoStored) {
        return res.status(200).send({ message: "No se guardo el libro" });
      }
      return res.status(201).send({ libro: produtoStored });
    } catch {
      return res.status(500).send({ message: "Error al guardar el libro" });
    }
  },

  //Devolver productos
  getProductos: async function (req, res) {
    try {
      const productos = await Producto.find({}).sort();
      if (!productos.lenght === 0) {
        return res.status(404).send({ message: "No hay libros" });
      }
      return res.status(200).send({ productos });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error al devolver los productos" });
    }
  },

  //Devolver un producto
  getProducto: async function (req, res) {
    try {
      var productoId = req.params.id;
      if (!productoId)
        return res.status(404).send({ message: "El producto no existe" });
      var producto = await Producto.findById(productoId);
      if (!producto)
        return res.status(404).send({ message: "El producto no existe" });
      var producto = await Producto.findById(producto);
      return res.status(200).send({ producto });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error al devolver los productos" });
    }
  },

  //Eliminar un producto
  deleteProducto: async function (req, res) {
    try {
      var productoId = req.params.id;
      var productoRemoved = await Producto.findByIdAndDelete(productoId);
      if (!productoRemoved)
        return res
          .status(404)
          .send({ message: "El producto no se puede eliminar" });
      return res.status(200).send({ productoRemoved });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error al eliminar los producto" });
    }
  },

  //Actualizar el producto
  updateProducto: async function (req, res) {
    console.log(req.body);
    try {
      var productoId = req.params.id;
      let update = { ...req.body };
      update.imagen = null;
      var libroUpdated = await Producto.findByIdAndUpdate(productoId, update, {
        new: true,
      });
      if (!libroUpdated) {
        return res.status(404).send({ message: "No existe el producto" });
      }
      res.status(200).send({ libroUpdated });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el producto" });
    }
  },
  //subir imagen
  uploadImage: async function (req, res) {
    try {
      var productoId = req.params.id;
      var fileName = "Imagen no subida";

      if (req.files && req.files.imagen) {
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split(path.sep); // Usa path.sep en lugar de "\\" para compatibilidad multiplataforma
        fileName = fileSplit.pop();
        var extSplit = fileName.split(".");
        var fileExt = extSplit.pop().toLowerCase(); // Convertir a minúsculas para mayor consistencia

        if (["png", "jpg", "jpeg", "gif"].includes(fileExt)) {
          var productoUpdeted = await Producto.findByIdAndUpdate(
            productoId,
            { imagen: fileName },
            { new: true }
          );

          if (!productoUpdeted) {
            fs.unlink(filePath, (err) => {
              if (err) console.error(err);
              res.status(404).send({
                message: "El producto no existe y no se puede subir la imagen",
              });
            });
          } else {
            res.status(200).send({ producto: productoUpdeted });
          }
        } else {
          fs.unlink(filePath, (err) => {
            if (err) console.error(err);
            res.status(400).send({ message: "Extensión de archivo no válida" });
          });
        }
      } else {
        res.status(400).send({ message: "No se recibió ninguna imagen" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "La imagen no se ha subido" });
    }
  },
  getImage: async function (req, res) {
    try {
      var file = req.params.imagen;
      var path_file = "./uploads/" + file;
      var exists = await fs.promises
        .access(path_file)
        .then(() => true)
        .catch(() => false);
      if (exists) return res.sendFile(path.resolve(path_file));
      else return res.status(200).send({ message: "La imagen no existe" });
    } catch (err) {
      return res.status(500).send({ message: "Error al recuperar la imagen" });
    }
  },
};
module.exports = controller;
