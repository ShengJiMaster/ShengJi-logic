const vals = ['clubs', 'diamonds', 'hearts', 'spades', 'joker'];

const mapStrToNum = {};
for (let i = 0; i < vals.length; i++) {
	mapStrToNum[vals[i]] = i;
}

const Suits = { vals, mapStrToNum };

module.exports = Suits;
