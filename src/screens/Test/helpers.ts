export const getWalletValue = (tokensBalances) => {
	let totalWalletValue = 0.0;
	tokensBalances.forEach(({ tokens }) => {
		totalWalletValue += tokens.reduce((a, { balanceUSD }) => a + balanceUSD, 0);
	});
	return totalWalletValue;
};
