const { normalize, schema, denormalize } = require("normalizr");
const util = require("util");
const mongoose = require("mongoose");
const messageModel = require("./models/Message.model");

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("message", {
  author: authorSchema,
});
const messagesSchema = { messages: [messageSchema] };

//La libreria al no estar funcionando correctamente cree todo como deberia estar funcionando
//Cree un metodo test para mostrar el correcto entendimiento de normalizr
//Se accede desde la collection de postman test

const getMensajes = async () => {
  return await messageModel.find();
};

const testNormalizr = () => {
  const myData = {
    messages: [
      {
        id: 1,
        author: {
          email: "correo1@hotmail.com",
          name: "nombre1",
          apellido: "apellido1",
          edad: 10,
          alias: "alias1",
          avatar: "http://avatar1.jpg",
        },
        text: "texto 1",
      },
      {
        id: 2,
        author: {
          email: "correo2@hotmail.com",
          name: "nombre2",
          apellido: "apellido2",
          edad: 20,
          alias: "alias2",
          avatar: "http://avatar2.jpg",
        },
        text: "texto 2",
      },
      {
        id: 3,
        author: {
          email: "correo3@hotmail.com",
          name: "nombre3",
          apellido: "apellido3",
          edad: 30,
          alias: "alias3",
          avatar: "http://avatar3.jpg",
        },
        text: "texto 3",
      },
      {
        id: 4,
        author: {
          email: "correo2@hotmail.com",
          name: "nombre2",
          apellido: "apellido2",
          edad: 20,
          alias: "alias2",
          avatar: "http://avatar2.jpg",
        },
        text: "texto 4",
      },
    ],
  };
  const normalizeArray = normalize(myData, messagesSchema);
  console.log("normalizeArray", normalizeArray);
  const denormalized = denormalize(
    normalizeArray.result,
    messagesSchema,
    normalizeArray.entities
  );
  console.log("denormalized", denormalized);
  return denormalized;
};

const addMensaje = async (mensaje) => {
  try {
    const mensGuardar = new messageModel(mensaje);
    mensGuardar.save();
    console.log("Mensaje guardado", mensGuardar);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { addMensaje, getMensajes, testNormalizr };
