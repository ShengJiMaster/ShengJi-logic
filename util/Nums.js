const vals = [
	null,
	null,
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
	'joker-sm',
	'joker-lg',
];

const mapStrToNum = {};
for (let i = 2; i < vals.length; i++) {
	mapStrToNum[vals[i]] = i;
}

const Nums = { vals, mapStrToNum };

module.exports = Nums;
