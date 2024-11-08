// Description:
// We want to create a function that will add numbers together when called in succession.

// add(1)(2); // == 3
// We also want to be able to continue to add numbers to our chain.

// add(1)(2)(3); // == 6
// add(1)(2)(3)(4); //  == 10
// add(1)(2)(3)(4)(5); // == 15
// and so on.

// A single call should be equal to the number passed in.

// add(1); // == 1
// We should be able to store the returned values and reuse them.

// var addTwo = add(2);
// addTwo; // == 2
// addTwo + 5; // == 7
// addTwo(3); // == 5
// addTwo(3)(5); // == 10
// We can assume any number being passed in will be valid whole number.

function add(n) {
  const f = (x) => add(n + x);
  f.valueOf = () => n;

  return f;
}

const testCases = [
  // Тест "A single call should return the number passed in"
  { args: [1], expected: 1 },

  // Тест "several calls"
  { args: [1, 2], expected: 3 },
  { args: [1, 2, 3], expected: 6 },
  { args: [1, 2, 3, 4], expected: 10 },
  { args: [1, 2, 3, 4, 5], expected: 15 },

  // Тест "should be able to be mixed with numbers"
  { args: [1, 2], expected: 3, addNumber: 3, mixedExpected: 6 },

  // Тест "Must be able to store values"
  { args: [1, 2], expected: 3, store: true },
  { args: [3, 4], expected: 7, store: true },

  // Тест "Must be able to store curried functions"
  { args: [1, 2], expected: 3, curried: [3], curriedExpected: 6 },

  // Тест "Must be callable with a curried function"
  { args: [1, 2], expected: 3, combinedWith: [3, 4], combinedExpected: 10 },
  { args: [3, 4], expected: 7, combinedWith: [1, 2], combinedExpected: 10 },
];

const test = testCases.every(
  ({ args, expected, addNumber, mixedExpected, store, curried, curriedExpected, combinedWith, combinedExpected }) => {
    // Вычисляем результат каррирования для args
    const result = args.reduce((acc, arg) => acc(arg), add);

    // Основная проверка результата
    if (result != expected) return false;

    // Проверка смешанного вызова с числом
    if (addNumber !== undefined && result + addNumber !== mixedExpected) return false;

    // Проверка хранения значения
    if (store && result != expected) return false;

    // Проверка каррирования с дальнейшим вызовом
    if (curried && curriedExpected && result(curried[0]) != curriedExpected) return false;

    // Проверка комбинированного вызова с другой функцией add
    if (combinedWith) {
      const combinedResult = combinedWith.reduce((acc, arg) => acc(arg), add);
      if (result(combinedResult) != combinedExpected || combinedResult(result) != combinedExpected) return false;
    }

    return true;
  },
);

if (test) {
  console.log('%cTest passed', 'color: green; font-weight: bold;');
} else {
  console.log('%cTest failed', 'color: red; font-weight: bold;');
}
