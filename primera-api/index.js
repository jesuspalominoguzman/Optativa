import http from "node:http";

const usuarios = [
  { id: 1, nombre: "Javier", edad: 42, altura: 180 },
  { id: 2, nombre: "Pablo", edad: 10, altura: 210 },
  { id: 3, nombre: "Leandro", edad: 21, altura: 170 },
];

const server = http.createServer((req, res) => {
  const { url } = req;
  res.setHeader(`Content-Type`, `text/json; charset=utf-8`);
  if (url === "/") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido a la Home</h1>");
  } else if (url === "/usuarios") {
    res.statusCode = 200;
    res.end(JSON.stringify(usuarios));
  } else {
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
});
const DESIRED_PORT = 3000;
server.listen(DESIRED_PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`,
  );
});