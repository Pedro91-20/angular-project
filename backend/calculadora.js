'use strict'

var params = process.argv.slice(2); // nos permite capturar los parametros pasados por la consola. 
//Le pasamos el numero 2 para que empiece por el indice numero 2 que es donde empiezan pos numeros que 
//les he pasado por consola.

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${numero1 + numero2}
La resta es: ${numero1 - numero2}
La multiplicación: ${numero1 * numero2}
La división: ${numero1 / numero2}
`;

console.log(plantilla);


console.log("Hola mundo con NodeJS");
