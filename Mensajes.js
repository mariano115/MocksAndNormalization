const { options } = require('./options/sqliteDB');
const knex = require('knex')(options);

const getMensajes = async () => {
  return await knex.from('messages').select("*");
};

const addMensaje = async (mensaje) => {
  try {
    await knex('messages').insert({
      email: mensaje.email,
      date: mensaje.date,
      text: mensaje.text
    });
  } catch (error) {
    console.log("Fallo al añadir un mensaje", error);
  }
};

module.exports = { addMensaje, getMensajes };
