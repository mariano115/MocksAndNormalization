const express = require("express");
const { Container } = require("./Container");
const { getMensajes, addMensaje } = require("./Mensajes");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { faker } = require("@faker-js/faker");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;
let container = new Container();

io.on("connection", async (socket) => {
  await getMensajes().then((res) => socket.emit("messages", res));
  socket.emit("products", await fakerProducts(5));

  socket.on("new-message", async (data) => {
    await addMensaje({
      id: data.id,
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
      alias: data.alias,
      avatar: data.avatar,
      text: data.text
    });
    io.sockets.emit("messages", await getMensajes());
  });

  /* socket.on("new-product", async (data) => {
    await container.addProduct({
      nombre: data.nombre,
      precio: data.precio,
      foto: data.foto,
    });
    io.sockets.emit("products", await container.getAll());
  }); */
});

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { productos: fakerProducts(5) });
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
