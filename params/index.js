if (process - argv[2] == "-h") {
  console.log("Hola mundo");
}

if (process - argv[2] == "a") {
  console.log("Adios mundo");
} else {
  console.log("Ni hola ni adios");
}

console.log("Hello World!");
console.log("ruta absoluta del ejecutable" + process.argv[0]);
console.log(
  "ruta absoluta del archivo que se esta ejecutando" + process.argv[1],
);
console.log("primer parametro: " + process.argv[2]);
console.log("segundo parametro: " + process.argv[3]);

console.log("Cuantos parametros hay " + process.argv.length);
