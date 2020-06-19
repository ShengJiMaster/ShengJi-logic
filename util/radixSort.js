const _ = require('lodash');

const countDigits = (n) => {
	if (n === 0) return 1;
	let len = 0;
	n = Math.abs(n);
	while (n >= 1) {
		n /= 10;
		len++;
	}
	return len;
};

const getDigit = (n, exp) => {
	exp = Math.pow(10, exp - 1);
	return Math.floor(n / exp) % 10;
};

const countSort = (arr, exp = 1) => {
	const temp = new Array(10).fill().map(() => []);
	for (let i = 0; i < arr.length; i++) {
		const n = arr[i];
		const d = getDigit(n, exp);
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

const radixSort = (arr) => {
	const max = arr.reduce((acc, val) => Math.max(acc, countDigits(val)), 1);
	for (let i = 1; i <= max; i++) {
		arr = countSort(arr, i);
	}
	return arr;
};

// let nums = _.shuffle(_.range(0, 101, 10));
// nums = countSort(nums, 2);
// console.log(nums);
// const sort = countSort(nums, 1);

module.exports = { radixSort, getDigit, countSort, countDigits };
