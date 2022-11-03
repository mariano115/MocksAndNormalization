const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  id: { type: Number, required: true },
  mensajes: { type: Array, required: true }
});

module.exports = model("message", messageSchema);
