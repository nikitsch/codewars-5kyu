// Description:
// Your goal is to make a stack based programming language with the following functions/tokens:

// start - Marks the start of the program.
// end - Marks the end of the program, and returns the top element in the stack.
// push x - Pushes the integer x into the stack.
// add - Adds together the top two elements on the stack.
// sub - Subtracts the top-most element by the second top-most element on the stack.
// mul - Multiplies the top two elements on the stack.
// div - Divides (integer division) the top-most element by the second top-most element on the stack.
// Demo:

//    start push 5 push 3 add end
//  = 8
//    start push 2 push 5 div push 3 push 8 mul mul end
//  = 48
// Easy, right?

// Such a trivial string interpreter is probably too simple for an amazing code warrior like you. To spice things up, we will add bubbles into the mix. Each token must be engulfed by a bubble (parentheses)!

// The syntax should be like:

// (start)(push)(4)(push)(9)(div)(end)
// which returns 2 in this case.

// Task
// Your goal is to create appropriate definitions for start, end, push, add, sub, mul and div so that the bubbly language is valid JavaScript syntax, and evaluates to the correct value.

// For instance, typing this in a shell should result in:

// >>> (start)(push)(5)(push)(8)(push)(1)(add)(add)(end)
// 14
// See the example tests for more examples.

// Notes
// Your definitions should allow multiple bubbly language statements in one script (node session).
// Don't worry about division by 0. There won't be any test cases on that.

// All input will be valid.

// This kata is inspired by A Simple Postfix Language.

const start = (func) => {
  const stack = [];
  return func(stack);
}

const push = (stack) => {
  return (count) => {
    return (func) => func([...stack, count])
  }
}

const add = (stack) => {
  const result = stack.pop() + stack.pop(); 
  return (func) => func([...stack, result]);
}

const sub = (stack) => {
  const result = stack.pop() - stack.pop();
  return (func) => func([...stack, result]);
}

const div = (stack) => {
  const divides = stack.pop() / stack.pop();
  const result = divides >= 0 ? Math.floor(divides) : Math.ceil(divides);
  return (func) => func([...stack, result]);
}

const mul = (stack) => {
  const result = stack.pop() * stack.pop();
  return (func) => func([...stack, result]);
}

const end = (stack) => stack.pop();

const testCases = [
  [(start)(push)(5)(push)(3)(add)(end), 8],
  [(start)(push)(2)(push)(5)(div)(push)(3)(push)(8)(mul)(mul)(end), 48],
  [(start)(push)(4)(push)(9)(div)(end), 2],
  [(start)(push)(5)(push)(8)(push)(1)(add)(add)(end), 14]
];

const test = testCases.every(([func, result]) => func === result);
if (test) {
  console.log('%cTest passed', 'color: green; font-weight: bold;');
} else {
  console.error('Test failed');
}