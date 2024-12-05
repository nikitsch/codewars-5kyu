// Description:
// TL;DR: write a nouveau function that replicates all the behavior of the new operator.

// Aside: Operators?
// In JavaScript, perhaps no operator is as complicated as new. "Wait; new is an operator?" Yep; an operator is something that operates on one or more operands and evaluates to a result. Binary operators like + and !== operate on two operands:

// 5 + 5 evaluates to 10
// {} !== [] evaluates to true
// Whereas unary operators like + and typeof take one operand (hmm, + is both a unary and binary operator, how 'bout that!):

// +'5' evaluates to 5
// typeof '5' evaluates to 'string'
// Ultimately operators are functions with different syntax. They take inputs/operands and return/evaluate to something. In fact, some JS operators can be re-written as functions.

// New
// So what about new? Well, the unary operator new is intended to create "instances" of a constructor function. To be more precise, the operation new Constructor(arg1, arg2, ...argX) does the following:

// Creates an empty object (which we'll call instance) which prototypally inherits from Constructor.prototype
// Binds Constructor to instance (meaning this is instance) and invokes Constructor with any arguments passed in
// If the return value of Constructor is an object (including arrays, functions, dates, regexes, etc.) the operation evaluates to that object
// Otherwise, the operation evaluates to instance
// Let's see some examples:

// function Person (name, age) {
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.introduce = function(){
//   return 'My name is ' + this.name + ' and I am ' + this.age;
// };
// var john = new Person('John', 30);
// var jack = new Person('Jack', 40);
// console.log( john.introduce() ); // My name is John and I am 30
// console.log( jack.introduce() ); // My name is Jack and I am 40

// function ReturnsArray (name) {
//   this.name = name;
//   return [1, 2, 3];
// }
// var arr = new ReturnsArray('arr?');
// console.log( arr.name ); // undefined
// console.log( arr ); // [1, 2, 3]
// Oof! No wonder people get confused about new. The good news is… everything new can do, you can do too.

// Exercise
// Your mission: write a function nouveau (that's French for "new") which takes one function parameter (the constructor), plus an unknown number of additional parameters of any type (arguments for the constructor). When invoked, nouveau should do everything new does and return the same object new would evaluate to, as specified above.

// var john = nouveau(Person, 'John', 30); // same result as above
// Good luck!

function nouveau(Constructor, ...args) {
  const EXAMPLE = Object.create(Constructor.prototype);
  const VARIABLE = Constructor.apply(EXAMPLE, args);

  return VARIABLE === Object(VARIABLE) ? VARIABLE : EXAMPLE;
}

// Test 1:
(function () {
  const testCases = [];

  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHi = function () {
    return 'Hi, I am ' + this.name;
  };

  const man = nouveau(Person, 'Man');
  testCases.push([man.name, 'Man']);
  testCases.push([man.sayHi(), 'Hi, I am Man']);

  const result = testCases.every(([func, result]) => func === result);
  if (result) {
    console.log('%cTest 1 passed', 'color: green; font-weight: bold;');
  } else {
    console.error('Test 1 failed');
  }
})();

// Test 2:
(function () {
  const testCases = [];

  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.introduce = function () {
    return 'My name is ' + this.name + ' and I am ' + this.age;
  };

  const frank = nouveau(Person, 'Frank', 46);
  testCases.push([frank.name, 'Frank']);
  testCases.push([frank.age, 46]);
  testCases.push([frank.introduce(), 'My name is Frank and I am 46']);

  const john = nouveau(Person, 'John', 43);
  testCases.push([john.name, 'John']);
  testCases.push([john.age, 43]);
  testCases.push([john.introduce(), 'My name is John and I am 43']);

  const result = testCases.every(([func, result]) => func === result);
  if (result) {
    console.log('%cTest 2 passed', 'color: green; font-weight: bold;');
  } else {
    console.error('Test 2 failed');
  }
})();
