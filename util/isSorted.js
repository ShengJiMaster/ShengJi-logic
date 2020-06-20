const isSorted = (arr, comparator = (a, b) => a - b) => {
	if (arr.length < 2) return true;
	for (let i = 1; i < arr.length; i++) {
		const prev = arr[i - 1];
		const cur = arr[i];
		const sorted = comparator(cur, prev) > 0;
		if (!sorted) {
			throw new Error(
				`isSorted: prev=${prev}; cur=${cur}; arr=${arr.join(',')}`,
			);
		}
	}
	return true;
};

module.exports = isSorted;
