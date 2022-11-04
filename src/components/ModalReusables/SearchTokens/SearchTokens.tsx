/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme, useLanguage, useBalances, useGlobalWalletState } from '@hooks';
import _ from 'lodash';
import { paraswapTokens, exchangebleTokens } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { networks } from '@models/network';
import ModalHeader from '../../ModalHeader/ModalHeader';
import ScreenLoadingIndicator from '../../ScreenLoadingIndicator/ScreenLoadingIndicator';
import SearchInput from '../../SearchInput/SearchInput';
import Text from '../../Text/Text';
import Token from '../../Token/Token';
import Touchable from '../../Touchable/Touchable';
import EmptyStates from '../../EmptyStates';
import { SearchTokensProps } from './SearchTokens.types';
import { makeStyles } from './SearchTokens.styles';

const SearchTokens: React.FC<SearchTokensProps> = ({
	visible,
	onDismiss,
	onTokenSelect,
	ownedTokens = [],
	showOnlyOwnedTokens,
	selected,
	withdraw = false
}) => {
	const { i18n } = useLanguage();
	const [tokens, setTokens] = useState<Array<MinkeToken>>();
	const [filteredTokens, setFilteredTokens] = useState<Array<MinkeToken>>();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const { withdrawableTokens } = useBalances();
	const { colors } = useTheme();
	const { network } = useGlobalWalletState();
	const styles = makeStyles(colors);

	const removeSelectedTokens = useCallback(
		(allTokens: MinkeToken[]) => {
			let selectedTokens: MinkeToken[] = allTokens || [];
			if (showOnlyOwnedTokens) {
				const owned = selectedTokens.filter(({ symbol }) => !!symbol).map(({ symbol }) => symbol.toLowerCase());
				selectedTokens = (ownedTokens || []).filter(
					({ symbol }) => !!symbol && owned.includes(symbol.toLowerCase())
				);
			}
			if (selected && selected.length > 0) {
				const filter = _.filter(
					selectedTokens,
					({ symbol }) => !!symbol && !selected.includes(symbol.toLocaleLowerCase())
				);
				setFilteredTokens(filter);
			} else {
				setFilteredTokens(selectedTokens);
			}
			setLoading(false);
		},
		[ownedTokens, selected]
	);

	const priorities = [
		...network.suggestedTokens.map((t) => t.symbol),
		...['BNB', 'MATIC', 'ETH', 'BUSD', 'DAI', 'USDT', 'USDC']
	];

	useEffect(() => {
		const loadTokens = async () => {
			if (withdraw || (tokens || []).length === 0) {
				setLoading(true);
				let allTokens = withdraw
					? withdrawableTokens
					: (await paraswapTokens()).tokens.sort(
							(a, b) => priorities.indexOf(b.symbol) - priorities.indexOf(a.symbol)
					  );
				if (!withdraw && network.id === networks.matic.id) {
					allTokens = allTokens.map((t) => {
						if (t.symbol === 'QUICK') {
							const token = t;
							// QUICK changed address
							token.address = '0xb5c064f955d8e7f38fe0460c556a72987494ee17';
							return token;
						}

						if (t.address.toLowerCase() === '0x8a953cfe442c5e8855cc6c61b1293fa648bae472') {
							const token = t;
							token.symbol = 'PolyDoge';
							return token;
						}

						if (t.symbol === 'ETH') {
							const token = t;
							token.symbol = 'WETH';
							return token;
						}

						return t;
					});
				}
				setTokens(allTokens);
				removeSelectedTokens(allTokens);
				setLoading(false);
			}
		};
		loadTokens();
	}, [withdrawableTokens, withdraw]);

	useEffect(() => {
		setSearch('');
	}, [visible]);

	const onSearch = (text: string) => {
		setSearch(text);

		if (text) {
			const data = _.filter(filteredTokens, (token) => token.symbol.toLowerCase().includes(text.toLowerCase()));
			setFilteredTokens(data);
		} else {
			setFilteredTokens(filteredTokens);
		}
	};

	const filterByExchangebleToken = useCallback(() => {
		if (network.chainId === networks.matic.chainId) {
			return filteredTokens!.filter((item) => exchangebleTokens.includes(item.symbol));
		}

		return filteredTokens;
	}, [filteredTokens, exchangebleTokens, network.chainId]);

	if (!visible) {
		return null;
	}

	if (!tokens || loading) {
		return <ScreenLoadingIndicator />;
	}

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={{ paddingLeft: 24, paddingRight: 24 }}>
				<SearchInput
					marginBottom={24}
					placeholder={i18n.t('Components.Inputs.search_token')}
					{...{ search, onSearch }}
				/>
				<FlatList
					style={styles.list}
					data={filterByExchangebleToken()}
					showsVerticalScrollIndicator={false}
					keyExtractor={(token) => token.address}
					renderItem={({ item }) => (
						<Touchable onPress={() => onTokenSelect(item)} style={styles.tokenItem}>
							<View style={{ marginRight: 16 }}>
								<Token token={item} size={40} />
							</View>
							<View style={styles.tokenItemNameContainer}>
								<Text style={styles.tokenItemSymbol}>{item.name || item.symbol}</Text>
								<Text style={styles.tokenItemName}>{item.symbol}</Text>
							</View>
						</Touchable>
					)}
				/>

				{(filteredTokens || []).length === 0 && <EmptyStates.NoTokens />}
				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SearchTokens;
