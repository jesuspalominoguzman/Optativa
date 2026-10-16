import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';
import validator from 'validator';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import ms from 'ms';

// 1. Capturar carpeta por argumento de terminal o usar './archivostextos' por defecto
const carpetaObjetivo = process.argv[2] ?? './archivostextos';
const rl = readline.createInterface({ input, output });

async function ejecutarExamen() {
  try {
    console.log(chalk.bgCyan.black.bold(' === ANALIZADOR DE ARCHIVOS DE TEXTO === \n'));

    // 2. Pedir email hasta que sea válido (Bucle while con await: ¡Súper útil en examen!)
    let email = '';
    while (!validator.isEmail(email)) {
      email = await rl.question(chalk.yellow('Introduce tu correo de autor: '));
      if (!validator.isEmail(email)) {
        console.log(chalk.red('❌ Correo inválido. Inténtalo de nuevo.'));
      }
    }

    // 3. Pedir palabra clave a buscar validando que no esté vacía
    const palabra = await rl.question(chalk.yellow('¿Qué palabra quieres buscar en los .txt?: '));
    if (validator.isEmpty(palabra, { ignore_whitespace: true })) {
      console.log(chalk.red('❌ La palabra no puede estar vacía.'));
      process.exit(1);
    }

    // 4. Leer el directorio y filtrar solo los archivos .txt
    const listaArchivos = await readdir(carpetaObjetivo);
    const archivosTxt = listaArchivos.filter((archivo) => path.extname(archivo) === '.txt');

    if (archivosTxt.length === 0) {
      console.log(chalk.red('⚠ No hay archivos .txt en la carpeta indicada.'));
      process.exit(0);
    }

    let coincidencias = 0;
    let bytesTotales = 0;
    let detalleArchivos = '';

    // 5. Recorrer los archivos, leer su contenido y sus metadatos (stat)
    for (const archivo of archivosTxt) {
      const rutaCompleta = path.join(carpetaObjetivo, archivo);
      const contenido = await readFile(rutaCompleta, 'utf-8');
      const info = await stat(rutaCompleta);

      bytesTotales += info.size;
      const contienePalabra = contenido.toLowerCase().includes(palabra.toLowerCase());
      
      if (contienePalabra) coincidencias++;

      console.log(
        contienePalabra 
          ? chalk.green(`✔ [${archivo}] (${info.size} B) -> Contiene "${palabra}"`)
          : chalk.gray(`✖ [${archivo}] (${info.size} B) -> No la contiene`)
      );

      detalleArchivos += `- ${archivo}: ${contenido.trim()} (${info.size} bytes)\n`;
    }

    // 6. Fechas con date-fns e ID con uuid
    const idInforme = uuidv4();
    const hoy = new Date();
    const fechaRevision = addDays(hoy, 15); // Sumamos 15 días a hoy
    const hoyStr = format(hoy, "dd/MM/yyyy HH:mm", { locale: es });
    const revisionStr = format(fechaRevision, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

    // 7. Datos del sistema con node:os y ms
    const tiempoEncendido = ms(os.uptime() * 1000, { long: true });

    // 8. Crear carpeta 'informes' y guardar el resultado
    const carpetaSalida = path.join('.', 'informes');
    await mkdir(carpetaSalida, { recursive: true });
    const rutaInforme = path.join(carpetaSalida, `informe-${idInforme.slice(0, 8)}.txt`);

    const contenidoInforme = [
      `ID INFORME: ${idInforme}`,
      `AUTOR: ${email}`,
      `FECHA CREACIÓN: ${hoyStr}`,
      `PRÓXIMA REVISIÓN (+15 días): ${revisionStr}`,
      `SO: ${os.platform()} (${os.arch()}) | Uptime: ${tiempoEncendido}`,
      `ARCHIVOS ANALIZADOS: ${archivosTxt.length} (${bytesTotales} bytes en total)`,
      `COINCIDENCIAS CON "${palabra}": ${coincidencias}`,
      `\n--- CONTENIDO DE LOS ARCHIVOS ---`,
      detalleArchivos
    ].join('\n');

    await writeFile(rutaInforme, contenidoInforme, 'utf-8');
    console.log(chalk.bgGreen.black(`\n ✔ Informe guardado en: ${rutaInforme} `));

  } catch (error) {
    console.error(chalk.bgRed.white(' ERROR '), chalk.red(error.message));
  } finally {
    rl.close();
  }
}

ejecutarExamen();