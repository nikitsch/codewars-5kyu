// Description:
// Write a program that will calculate the number of trailing zeros in a factorial of a given number.

// N! = 1 * 2 * 3 *  ... * N

// Be careful 1000! has 2568 digits...

// For more info, see: http://mathworld.wolfram.com/Factorial.html

// Examples
// N	Product	N factorial	Trailing zeros
// 6	1*2*3*4*5*6	720	1
// 12	1*2*3*4*5*6*7*8*9*10*11*12	479001600	2
// Hint: You're not meant to calculate the factorial. Find another way to find the number of zeros.

function zeros(n) {
  let count = 0;
  let i = 5;

  while (n >= i) {
    count += Math.floor(n / i);
    i *= 5;
  }

  return count;
}

const testCases = [
  [0, 0],
  [5, 1],
  [6, 1],
  [30, 7],
];
const test = testCases.every(([n, result]) => zeros(n) === result);
if (test) {
  console.log('%cTest passed', 'color: green; font-weight: bold;');
} else {
  console.log('%cTest failed', 'color: red; font-weight: bold;');
}
