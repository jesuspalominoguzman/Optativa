import chalk from "chalk";

const informativo = chalk.blue;

const confirmacion = chalk.green;

const advertencia = chalk.yellow;

const error = chalk.red;

const destacado = chalk.bgBlue;

console.log(informativo("Esto es un mensaje informativo"));

console.log(confirmacion("Esto es un mensaje de operación corecta"));

console.log(advertencia("Esto es un mensaje de advertencia"));

console.log(error("Esto es un mensaje de error"));

console.log(destacado("Esto es un mensaje destacado"));
