import { readFile, writeFile, appendFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { createInterface } from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import 'node:process'

const rl = createInterface({input, output})
const archivo1 = process.argv[2]
const archivo2 = process.argv[3]
const archivo3 = process.argv[4]
const ruta = './'
const rutaArchivo1 = path.join(ruta, archivo1)
const rutaArchivo2 = path.join(ruta, archivo2)
const rutaArchivo3 = path.join(ruta, archivo3)
const infoArchivo1 = await stat(rutaArchivo1)
const infoArchivo2 = await stat(rutaArchivo2)

if (infoArchivo1.isFile() === true && infoArchivo2.isFile() === true) {

console.log("Comenzando mezcla de archivos...")
rl.question('\nLos argumentos que introdujiste llamados ' + archivo1 + ' y ' + archivo2 + ' son archivos, desea continuar? ', async (respuesta) => {
	if (respuesta === 'si') {
		const content1 = await readFile(rutaArchivo1, 'utf-8')
		console.log(`Este es el contenido del archivo ${archivo1}:\n${content1}`)
		
		console.log('Ya con el contenido del primer archivo, leemos el otro:')
		
		const content2 = await readFile(rutaArchivo2, 'utf-8')
		console.log(`Este es el contenido del archivo ${archivo2}:\n${content2}`)
		
		console.log('Ya con los dos leidos, vamos a juntarlos en un nuevo archivo')
		
		await writeFile(rutaArchivo3, '');
		await appendFile(rutaArchivo3, content1);
		await appendFile(rutaArchivo3, '\n' + content2);
		
		const contenidoFinal = await readFile(rutaArchivo3, 'utf-8');
		console.log(`Contenido final del archivo ${archivo3}:\n${contenidoFinal}`)
		
		
	} else if (respuesta === 'no') {
		console.log('Pues ya esta, no ejecuto nada')
	}
		
		rl.close()
	})

} else {
		console.log("Bro, los dos no son archivos, estas troleando una pila")
}