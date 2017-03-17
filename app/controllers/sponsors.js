const getAll = (req, res) => {
	let mock = {
		platinum: [
			{ name: 'Microsoft' }
		],
		gold: [
			{ name: 'Apple' },
			{ name: 'Oracle' },
			{ name: 'Google' }
		],
		silver: [
			{ name: 'Chachi' },
			{ name: 'Coso' },
			{ name: 'Chupi' }
		]
	};
	res.json(200, mock);
};

module.exports = {
	getAll
};