/*
 * 1. Definir una funcion que puedan llamar
 * Primero con un entero, tipos de datos simples, int, string*/

using PracticaExpresionFunciones;
using System.Linq.Expressions;

Func<int, int, int> sumar = (num1, num2) => (num1 + num2);
int resultado = sumar(6, 6);

/* 2. Definir una expresion
* tanto con funciones que usen un tipo o un modelo (class)*/

Expression<Func<int, bool>> esPar = num => num % 2 == 0;

//Aplicada a una clase
Func<Persona, string> obtenerNombre = p => p.Nombre;
Func<Persona, int> obtenerEdad = p => p.Edad;

/*3. Un model (class) con el que usen su funcion, para practicar el uso de propiedades
 */

Persona persona = new Persona("Juliet", 19);

Console.WriteLine(obtenerNombre(persona));
Console.WriteLine(obtenerEdad(persona));

/* 4. Creen un reposirtorio, donde manejen un generico y hagan uso de expresiones. Colocar constraint para unicamente clases
*/
