import http from "node:http";

const usuarios = [
  { id: 1, nombre: "Javier", edad: 42, altura: 180 },
  { id: 2, nombre: "Pablo", edad: 10, altura: 210 },
  { id: 3, nombre: "Leandro", edad: 21, altura: 170 },
];

const server = http.createServer((req, res) => {
  const { url, method } = req;
  
  // Ruta Base
  if (url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;
    res.end("<h1>Bienvenido a la Home</h1>");
  } 
  
  // Hacer un GET de usuarios
  else if (url === "/usuarios" && method === "GET") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = 200;
    res.end(JSON.stringify(usuarios));
  } 
  
  // Hacer un POST de usuarios
  else if (url === "/usuarios" && method === "POST") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    
    let body = "";

    // 1. Obtener el body de manera asíncrona a medida que llega el flujo de datos (stream)
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // 2. Cuando termina de llegar la información asíncrona, ejecutamos la lógica
    req.on("end", () => {
      // Parseamos el texto plano a un objeto de JavaScript
      const nuevoUsuario = JSON.parse(body);

      // 3. Calcular el siguiente id (buscando el más alto + 1)
      const maxId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) : 0;
      const siguienteId = maxId + 1;

      // 4. Insertar el nuevo usuario añadiéndole el id calculado
      const usuarioAInsertar = { id: siguienteId, ...nuevoUsuario };
      usuarios.push(usuarioAInsertar);

      // Devolvemos un status 201 (Creado) y el usuario insertado
      res.statusCode = 201;
      res.end(JSON.stringify(usuarioAInsertar));
    });
  } 
  
  // Ruta no encontrada (404)
  else {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
});

const DESIRED_PORT = 3000;
server.listen(DESIRED_PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`
  );
});