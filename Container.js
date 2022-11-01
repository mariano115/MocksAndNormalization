const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

class Container {
  addProduct = async (newProduct) => {
    try {
      if (JSON.stringify(newProduct) === "{}") {
        throw "Producto no Valido";
      }
      const products = await this.getAll()
      if (products.length > 0) {
        newProduct.id = products[products.length - 1].id + 1;
      } else {
        newProduct.id = 1;
      }

      await knex('products').insert({
        id: newProduct.id,
        nombre: newProduct.nombre,
        precio: newProduct.precio,
        foto: newProduct.foto
      });
      return newProduct;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getById = async (id) => {
    try {
      return await knex.from('products').where({ id })
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getAll = async () => {
    try {
      return await knex.from('products').select("*");
    } catch (error) {
      console.log(error)
    }
  };

  modifyProduct = async (id, product) => {
    try {
      await knex('products').where({ id }).
        update(product)
      return product;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  deleteById = async (id) => {
    try {
      await knex.from('products').where({ id }).del()
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  deleteAll = () => {
    try {
      knex('products').del()
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = {
  Container,
};
