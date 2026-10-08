import validator from "validator";

import { compareAsc, format } from "date-fns";

const email = process.argv[2];
const fecha = process.argv[3];

format(fecha, "DD/MM/YYYY");

if (validator.isEmail(email) && email != null) {
  console.log("Email válido");
} else {
  console.log("Email no válido");
}

if (validator.isDate(fecha, "DD/MM/YYYY") && fecha != null) {
  console.log("Fecha válida");
} else {
  console.log("Fecha no válida");
}
