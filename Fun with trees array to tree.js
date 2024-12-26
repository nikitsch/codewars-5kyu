// Description:
// You are given an array of integers. Implement a function which creates a complete binary tree from the array (complete meaning that every level of the tree, except possibly the last, is completely filled).

// The elements of the array are to be taken left-to-right, and put into the tree top-to-bottom, left-to-right.

// For example, given the array [17, 0, -4, 3, 15] you should create the following tree:

//     17
//    /  \
//   0   -4
//  / \
// 3   15
// A tree node type is preloaded for you:

// var TreeNode = function(value, left, right) {
//   this.value = value;
//   this.left = left;
//   this.right = right;
// };
// This kata is part of fun with trees series:

// Fun with trees: max sum
// Fun with trees: array to tree
// Fun with trees: is perfect

function arrayToTree(values, i = 0) {
  if (i >= values.length) {
    return;
  }

  return new TreeNode(values[i], arrayToTree(values, 2 * i + 1), arrayToTree(values, 2 * i + 2));
}

//TESTS
const TreeNode = function (value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
};

function test(array, expected) {
  return JSON.stringify(arrayToTree(array)) === JSON.stringify(expected);
}

// Test Empty Array:
(function () {
  try {
    const array = [];
    const expected = undefined;

    if (!test(array, expected)) {
      throw new Error(`Test \`Empty Array\` failed. Expected ${array} to equal ${expected}`);
    }

    console.log('%cTest `Empty Array` passed', 'color: green; font-weight: bold;');
  } catch (e) {
    console.error(e.message);
  }
})();

// Test Array With Multiple Elements:
(function () {
  try {
    const array = [17, 0, -4, 3, 15];
    const expected = new TreeNode(17, new TreeNode(0, new TreeNode(3), new TreeNode(15)), new TreeNode(-4));

    if (!test(array, expected)) {
      throw new Error(`Test \`Array With Multiple Elements\` failed. Expected ${array} to equal ${expected}`);
    }

    console.log('%cTest `Array With Multiple Elements` passed', 'color: green; font-weight: bold;');
  } catch (e) {
    console.error(e.message);
  }
})();
