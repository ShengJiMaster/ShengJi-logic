const cardValue = (n, s, base = 15) => {
	let sum = n;
	sum += s * base;
	return sum;
};

module.exports = cardValue;
