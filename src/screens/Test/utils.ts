const parseToken = ({ key, balanceUSD, context }) => {
	const { symbol } = context;
	return { key, symbol, balanceUSD };
};

const parseUniV3Position = ({ displayProps, balanceUSD, breakdown }) => {
	const { label } = displayProps;
	const supplied = breakdown.filter(({ metaType }) => metaType === 'supplied');
	let tokens = [];
	supplied.forEach(({ balanceUSD, context }) => {
		const { symbol } = context;
		tokens.push({
			symbol,
			balanceUSD
		});
	});
	return {
		label,
		balanceUSD,
		tokens
	};
};

const parseTokensFromWallet = (wallet) => {
	let tokens = [];
	let network = 'ethereum';
	Object.keys(wallet).forEach((value) => {
		network = wallet[value].network;
		tokens.push(parseToken(wallet[value]));
	});
	return { network, tokens };
};

const parseUniV3Positions = (positions) => {
	let liquidityPositions = [];
	positions.forEach((rawPosition) => {
		liquidityPositions.push(parseUniV3Position(rawPosition));
	});
	return liquidityPositions;
};

export const parse = (type, object) => {
	switch (type) {
		case 'tokens':
			return parseTokensFromWallet(object);
		case 'uniswap-v3':
			return parseUniV3Positions(object);
		default:
			return;
	}
};
