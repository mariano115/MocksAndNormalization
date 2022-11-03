const fs = require("fs");
const messageModel = require("../models/Message.model");

const getProductos = async () => {
  return await messageModel.find();
};

/* const getProductosById = async (id) => {
  return await messageModel.find({ _id: id });
};

const crearProducto = async (nuevoProducto) => {
  try {
    const producto = {
      timeStamp: new Date(),
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      codigo: nuevoProducto.codigo,
      foto: nuevoProducto.foto,
      precio: nuevoProducto.precio,
      stock: nuevoProducto.stock,
    };

    const res = await new messageModel(producto).save();
    return res._id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const editarProducto = async (id, product) => {
  try {
    return await messageModel.findOneAndUpdate({ _id: id }, { ...product });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const eliminarProducto = async (id) => {
  const res = await messageModel.deleteOne({ _id: id });
  if (res.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
}; */

module.exports = {
  getProductos/* ,
  getProductosById,
  crearProducto,
  editarProducto,
  eliminarProducto, */
};
