const express = require("express");
const mongoose = require("mongoose");
const { getMensajes, addMensaje, testNormalizr } = require("./Mensajes");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { faker } = require("@faker-js/faker");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const cors = require('cors')
const Config = require("./config");
const normalizr = require('normalizr');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

mongoose.connect(
  Config.urlMongo,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw new Error(`Error de conexión a la base de datos ${err}`);
    console.log("Base de datos conectada");
  }
);

io.on("connection", async (socket) => {
  await getMensajes().then((res) => socket.emit("messages", res));
  socket.emit("products", await fakerProducts(5));

  socket.on("new-message", async (data) => {
    await addMensaje({
      author: {
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
        edad: data.edad,
        alias: data.alias,
        avatar: data.avatar
      },
      text: data.text
    });
    io.sockets.emit("messages", await getMensajes());
  });
});

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { productos: fakerProducts(5) });
});

app.get("/test-mensaje", (req, res) => {
  res.send(testNormalizr());
});

app.get("/productos-test", async (req, res) => {
  res.send(fakerProducts(5))
});

const fakerProducts = () => {
  const products = []
  for (let index = 0; index < 5; index++) {
    products.push({
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      foto: faker.image.imageUrl()
    })
  }
  return products;
};

httpServer.listen(PORT, () => console.log("servidor Levantado"));
