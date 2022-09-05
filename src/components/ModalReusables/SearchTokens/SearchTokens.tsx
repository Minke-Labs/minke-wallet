import React, { useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme, useLanguage, useTokens } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import { paraswapTokens, exchangebleTokens } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { TokenType } from '@src/styles';
import ModalHeader from '../../ModalHeader/ModalHeader';
import ScreenLoadingIndicator from '../../ScreenLoadingIndicator/ScreenLoadingIndicator';
import SearchInput from '../../SearchInput/SearchInput';
import Text from '../../Text/Text';
import Token from '../../Token/Token';
import EmptyStates from '../../EmptyStates';
import { makeStyles } from './SearchTokens.styles';
import { SearchTokensProps } from './SearchTokens.types';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { networks } from '@models/network';

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
	const [tokens, setTokens] = React.useState<Array<MinkeToken>>();
	const [filteredTokens, setFilteredTokens] = React.useState<Array<MinkeToken>>();
	const [search, setSearch] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const { withdrawableTokens } = useTokens();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { network } = useState(globalWalletState()).value;

	const removeSelectedTokens = useCallback(
		(allTokens: MinkeToken[]) => {
			let selectedTokens: MinkeToken[] = allTokens || [];

			if (showOnlyOwnedTokens) {
				const owned = selectedTokens.map(({ symbol }) => !!symbol && symbol.toLowerCase());
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

	useEffect(() => {
		const loadTokens = async () => {
			if (withdraw || (tokens || []).length === 0) {
				setLoading(true);
				const allTokens = withdraw ? withdrawableTokens : (await paraswapTokens()).tokens;
				if (!withdraw && network.id === networks.matic.id) {
					allTokens.push({
						address: '0xb5c064f955d8e7f38fe0460c556a72987494ee17',
						decimals: 18,
						symbol: 'QUICK'
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

	useEffect(() => {
		const filterTokens = async () => {
			setLoading(true);
			removeSelectedTokens(tokens || []);
		};
		filterTokens();
	}, [selected]);

	const onSearch = (text: string) => {
		setSearch(text);

		if (text) {
			const data = _.filter(filteredTokens, (token) => token.symbol.toLowerCase().includes(text.toLowerCase()));
			setFilteredTokens(data);
		} else {
			setFilteredTokens(filteredTokens);
		}
	};

	const filterByExchangebleToken = useCallback(
		() => filteredTokens!.filter((item) => exchangebleTokens.includes(item.symbol)),
		[filteredTokens, exchangebleTokens]
	);

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
					keyExtractor={(token) => token.symbol}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => onTokenSelect(item)} style={styles.tokenItem}>
							<View style={{ marginRight: 16 }}>
								<Token name={item.symbol.toLowerCase() as TokenType} size={40} />
							</View>
							<View style={styles.tokenItemNameContainer}>
								<Text style={styles.tokenItemSymbol}>{item.symbol}</Text>
								<Text style={styles.tokenItemName}>{item.symbol}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>

				{(filteredTokens || []).length === 0 && <EmptyStates.NoTokens />}
				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SearchTokens;
