const isSorted = (arr, comparator = (a, b) => a - b) => {
	if (arr.length < 2) return true;
	for (let i = 1; i < arr.length; i++) {
		const prev = arr[i - 1];
		const cur = arr[i];
		const sorted = comparator(cur, prev) > 0;
		if (!sorted) return false;
	}
	return true;
};

module.exports = isSorted;
