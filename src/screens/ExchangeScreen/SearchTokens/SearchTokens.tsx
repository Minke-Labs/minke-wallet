import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ModalHeader, ScreenLoadingIndicator, SearchInput, Text, Token, EmptyStates } from '@components';
import { useTheme, useLanguage, useTokens } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import { paraswapTokens, ParaswapToken, exchangebleTokens } from '@models/token';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { TokenType } from '@src/styles';
import { makeStyles } from './SearchTokens.styles';
import { SearchTokensProps } from './SearchTokens.types';

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
	const [tokens, setTokens] = useState<Array<ParaswapToken>>();
	const [filteredTokens, setFilteredTokens] = useState<Array<ParaswapToken>>();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const { interestTokens } = useTokens();

	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const removeSelectedTokens = (allTokens: ParaswapToken[]) => {
		let selectedTokens: ParaswapToken[] = [];
		if (showOnlyOwnedTokens) {
			const filter = _.filter(
				allTokens,
				({ symbol }) => !!symbol && ownedTokens.includes(symbol.toLocaleLowerCase())
			);
			selectedTokens = filter;
		} else {
			selectedTokens = allTokens;
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
	};

	useEffect(() => {
		const loadTokens = async () => {
			setLoading(true);
			const allTokens = withdraw ? interestTokens : (await paraswapTokens()).tokens;
			setTokens(allTokens);
			removeSelectedTokens(allTokens);
			setLoading(false);
		};
		loadTokens();
	}, [interestTokens]);

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
			<ModalHeader {...{ onDismiss }} onBack={onDismiss} />
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
