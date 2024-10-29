// Description:
// Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :

//  "(p1**n1)(p2**n2)...(pk**nk)"
// with the p(i) in increasing order and n(i) empty if n(i) is 1.

// Example: n = 86240 should return "(2**5)(5)(7**2)(11)"

function primeFactors(n){
  const objectN = {};
  let num = n;
  let i = 2;
  
  while (num > 1) {
    while (num % i === 0) {
      objectN[i] = (objectN[i] ?? 0) + 1;
      num /= i;
    }
    i += 1;
  }
  
  return Object.entries(objectN)
    .map(([key, value]) => `(${key}${value > 1 ? `**${value}` : ''})`)
    .join('');
}

const testCases = [
  [7775460, '(2**2)(3**3)(5)(7)(11**2)(17)']
];

const test = testCases.every(([number, result]) => primeFactors(number) === result);
if (test) {
  console.log('%cTest passed', 'color: green; font-weight: bold;');
} else {
  console.error('Test failed');
}
