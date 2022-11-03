const { normalize, schema, denormalize  } = require('normalizr');
const util = require('util');
const mongoose = require("mongoose");
const messageModel = require("./models/Message.model");

const author = new schema.Entity('author', {}, { idAttribute: 'email' })
/* const text = new schema.Entity('text') */
/* const message = new schema.Entity('message', {
  author: author,/* 
  text: text 
}) */


const getMensajes = async () => {
  return await messageModel.find();
  /* const messages = await knex.from('messages').select("*")
  console.log(messages)
  const normalization = normalize(messages, message)
  console.log(util.inspect(normalization, false, 12, true)) */
  /*return  await knex.from('messages').select("*"); */
};

const addMensaje = async (mensaje) => {
  const messageRes = await messageModel.find({ _id: '636321d8e179eb2cbd010b85'});
  console.log(messageRes.mensajes)
  let desnormalizedArray = [];
  if(messageRes.mensajes !== undefined){
    desnormalizedArray = denormalize(messageRes.mensajes, author)
    console.log(desnormalizeArray)
  }
  desnormalizedArray.push(mensaje)
  console.log(desnormalizedArray)
  const normalizedArray = normalize(desnormalizedArray, author)
  console.log(util.inspect(normalizedArray, false, 12, true))

  await messageModel.findOneAndUpdate(
    { _id: '636321d8e179eb2cbd010b85' },
    { mensajes: normalizedArray}
  );



  /* console.log('addMensaje:', array)
  console.log(util.inspect(normalized, false, 12, true)) */
  /* const array = [];
  const mensajeModified = {
      email: mensaje.email,
      nombre: mensaje.nombre,
      apellido: mensaje.apellido,
      edad: mensaje.edad,
      alias: mensaje.alias,
      avatar: mensaje.avatar
  }
  
  array.push(mensajeModified)
  array.push(mensajeModified)
  
  console.log('addMensaje:', array)
  const normalized = normalize(array, author)
  console.log(util.inspect(normalized, false, 12, true))


 */
  /* try {
    await knex('messages').insert({
      author: {
        email: mensaje.email,
        nombre: mensaje.nombre,
        apellido: mensaje.apellido,
        edad: mensaje.edad,
        alias: mensaje.alias,
        avatar: mensaje.avatar
      },
      text: mensaje.text
    });
  } catch (error) {
    console.log("Fallo al añadir un mensaje", error);
  } */
};

module.exports = { addMensaje, getMensajes };
