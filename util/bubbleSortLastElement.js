/**
 * Bubble sorts the last element into place. Useful after appending a random value to a sorted array
 * @param {Array} arr
 * @param {[Function]} parse
 * @param {[Function]} comparator
 */

const bubbleSortLastElement = (
  arr = [],
  parse = (x) => x,
  comparator = (a, b) => a - b,
) => {
  const len = arr.length;
  if (len < 2) return arr;
  let i = len - 1;
  while (0 < i) {
    const swap = comparator(parse(arr[i - 1]), parse(arr[i])) > 0;
    if (swap) {
      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
    } else break;
    i--;
  }
  return arr;
};

module.exports = bubbleSortLastElement;
