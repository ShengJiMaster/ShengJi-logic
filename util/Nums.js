const defaultVals = [
	'joker-sm',
	'joker-lg',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'jack',
	'queen',
	'king',
	'ace',
];

class Nums {
	constructor(vals = defaultVals) {
		const mapStrToNum = {};
		for (let i = 2; i < vals.length; i++) {
			const str = vals[i];
			mapStrToNum[str] = i;
		}
		this.mapStrToNum = mapStrToNum;
	}
}

const Nums = { vals, mapStrToNum };

module.exports = Nums;
