import { appendFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises'

let nuevotexto = " si sigues bebiendo tanta agua";

const primercontenido = await readFile('./prueba.txt', 'utf-8')

await writeFile('./nuevaprueba.txt', nuevotexto)

await appendFile('./prueba.txt', nuevotexto)

const content = await readFile('./prueba.txt', 'utf-8')

await console.log(content)

await writeFile('./prueba.txt', primercontenido)






