// Description:
// This time we want to write calculations using functions and get the results. Let's have a look at some examples:

// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(dividedBy(two())); // must return 3
// Requirements:

// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner function represents the right operand
// Division should be integer division. For example, this should return 2, not 2.666666...:
// eight(dividedBy(three()));

function zero(arg) {
  return calculat(arg, 0);
}
function one(arg) {
  return calculat(arg, 1);
}
function two(arg) {
  return calculat(arg, 2);
}
function three(arg) {
  return calculat(arg, 3);
}
function four(arg) {
  return calculat(arg, 4);
}
function five(arg) {
  return calculat(arg, 5);
}
function six(arg) {
  return calculat(arg, 6);
}
function seven(arg) {
  return calculat(arg, 7);
}
function eight(arg) {
  return calculat(arg, 8);
}
function nine(arg) {
  return calculat(arg, 9);
}

function calculat(arg, num) {
  if (!arg) return num;
  const [sign, operand] = arg;

  let result;
  switch (sign) {
    case '+':
      result = num + operand;
      break;
    case '-':
      result = num - operand;
      break;
    case '*':
      result = num * operand;
      break;
    case '/':
      result = Math.floor(num / operand);
      break;
    default:
      console.log('Неизвестный оператор');
  }

  return result;
}

function plus(operand) {
  return ['+', operand];
}
function minus(operand) {
  return ['-', operand];
}
function times(operand) {
  return ['*', operand];
}
function dividedBy(operand) {
  return ['/', operand];
}

const testCases = [
  [seven(times(five())), 35],
  [four(plus(nine())), 13],
  [eight(minus(three())), 5],
  [six(dividedBy(two())), 3],
  [zero(times(one())), 0],
];
const test = testCases.every(([func, result]) => func === result);
if (test) {
  console.log('%cTest passed', 'color: green; font-weight: bold;');
} else {
  console.log('%cTest failed', 'color: red; font-weight: bold;');
}
