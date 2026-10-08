import path from "node:path";
import { readFile } from "node:fs/promises";

const argumento = process.argv[2];

if (!argumento) {
  console.error("El parametro enviado no es valido");
}

const CARPETA_ARCHIVOS = path.join(import.meta.dirname, "..", "archivostextos");

const file = argumento.endsWith(".txt") ? argumento : `${argumento}.txt`;
const ruta = path.join(CARPETA_ARCHIVOS, file);

try {
  const textoresultado = await readFile(ruta, "utf-8");
  console.log(textoresultado);
} catch (error) {
  console.error("Error al leer el archivo " + error.mensaje);
}
