# JavaScript ES6 Concepts

## 1. What is the difference between var, let, and const?
##### var: function scoped, can be redeclared and updated. let: block scoped, can be updated but not redeclared. const: block scoped, cannot be reassigned, but objects/arrays can be mutated.

## 2. What is the difference between map(), forEach(), and filter()?
##### forEach: executes a function on each element, returns undefined. map: transforms each element, returns a new array. filter: returns a new array with elements that pass a condition.

## 3. What are arrow functions in ES6?
##### Arrow functions are a shorter syntax for functions with lexical binding of this. Example: const add = (a,b) => a + b;

## 4. How does destructuring assignment work in ES6?
##### Destructuring allows unpacking values from arrays or objects into variables. Example: const [x,y]=[1,2]; const {name,age}={name:"Siddikur",age:22};

## 5. Explain template literals in ES6. How are they different from string concatenation?
##### Template literals use backticks (`) and allow embedding variables and expressions using ${}. They support multi-line strings and are more readable than traditional string concatenation. Example: const greet=`Hello, my name is ${name} and I am ${age} years old.`;
