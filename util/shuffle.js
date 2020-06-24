/**
 * Implements fischer-yates
 * @param {Array} arr
 * @returns {Array}
 */
const shuffle = (arr = []) => {
  if (arr.length < 2) return arr;
  for (let i = 0; i < arr.length; i++) {
    const rand = Math.floor(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

module.exports = shuffle;
