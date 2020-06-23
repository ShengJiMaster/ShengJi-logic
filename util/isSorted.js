const isSorted = (arr, parse = (x) => x, comparator = (a, b) => a - b) => {
  if (arr.length < 2) return true;
  for (let i = 1; i < arr.length; i++) {
    const prev = parse(arr[i - 1]);
    const cur = parse(arr[i]);
    const sorted = comparator(cur, prev) > 0;
    if (!sorted) {
      throw new Error(
        `isSorted: prev=${prev}; cur=${cur}; arr=${arr
          .map((x) => parse(x))
          .join(',')}`,
      );
    }
  }
  return true;
};

module.exports = isSorted;
