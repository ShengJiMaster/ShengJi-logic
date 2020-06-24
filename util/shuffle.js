/**
 * Implements fischer-yates
 * @param {Array} arr
 * @returns {Array}
 */
const shuffle = (arr = []) => {
  if (arr.length < 2) return arr;
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

module.exports = shuffle;
