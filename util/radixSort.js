const countDigits = (n, parse = (x) => x) => {
	n = parse(n);
	if (n === 0) return 1;
	let len = 0;
	n = Math.abs(n);
	while (n >= 1) {
		n /= 10;
		len++;
	}
	return len;
};

const getDigit = (n, exp, parse = (x) => x) => {
	n = parse(n);
	exp = Math.pow(10, exp - 1);
	return Math.floor(n / exp) % 10;
};

const countSort = (arr, exp = 1, parse = (x) => x) => {
	const temp = new Array(10).fill().map(() => []);
	for (let i = 0; i < arr.length; i++) {
		const n = arr[i];
		const d = getDigit(n, exp, parse);
		temp[d].push(n);
	}
	arr = [];
	for (let i = 0; i < temp.length; i++) {
		for (let k = 0; k < temp[i].length; k++) {
			arr.push(temp[i][k]);
		}
	}
	return arr;
};

const radixSort = (arr, parse = (x) => x) => {
	const max = arr.reduce(
		(acc, val) => Math.max(acc, countDigits(val, parse)),
		1,
	);
	for (let i = 1; i <= max; i++) {
		arr = countSort(arr, i, parse);
	}
	return arr;
};

module.exports = { radixSort, getDigit, countSort, countDigits };
