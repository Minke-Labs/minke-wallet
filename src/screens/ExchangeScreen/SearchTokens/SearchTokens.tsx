import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, View } from 'react-native';
import { whale2Img } from '@images';
import { ModalHeader, ScreenLoadingIndicator, SearchInput, Text, Token } from '@components';
import { useTheme } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import { paraswapTokens, ParaswapToken } from '@models/token';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { TokenType } from '@src/styles';
import { makeStyles } from './SearchTokens.styles';

const SearchTokens = ({
	visible,
	onDismiss,
	onTokenSelect,
	ownedTokens = [],
	showOnlyOwnedTokens,
	selected
}: {
	visible: boolean;
	onDismiss: any;
	onTokenSelect: Function;
	showOnlyOwnedTokens: boolean;
	ownedTokens?: Array<string>;
	selected?: Array<string | undefined>;
}) => {
	const [tokens, setTokens] = useState<Array<ParaswapToken>>();
	const [filteredTokens, setFilteredTokens] = useState<Array<ParaswapToken>>();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);

	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const removeSelectedTokens = (allTokens: ParaswapToken[]) => {
		let selectedTokens: ParaswapToken[] = [];
		if (showOnlyOwnedTokens) {
			const filter = _.filter(allTokens, (token) => ownedTokens.includes(token.symbol.toLocaleLowerCase()));
			selectedTokens = filter;
		} else {
			selectedTokens = allTokens;
		}

		if (selected && selected.length > 0) {
			const filter = _.filter(selectedTokens, (token) => !selected.includes(token.symbol.toLocaleLowerCase()));
			setFilteredTokens(filter);
		} else {
			setFilteredTokens(selectedTokens);
		}
		setLoading(false);
	};

	useEffect(() => {
		const loadTokens = async () => {
			setLoading(true);
			const allTokens = (await paraswapTokens()).tokens;
			setTokens(allTokens);
			removeSelectedTokens(allTokens);
			setLoading(false);
		};
		loadTokens();
	}, []);

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

	if (!tokens || loading) {
		return <ScreenLoadingIndicator />;
	}

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} onBack={onDismiss} />
			<View style={{ paddingLeft: 24, paddingRight: 24 }}>
				<SearchInput {...{ search, onSearch }} />

				<FlatList
					style={styles.list}
					data={filteredTokens}
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
				{(filteredTokens || []).length === 0 && (
					<View style={styles.tableContainer}>
						<Image source={whale2Img} style={styles.image} />
						<Text color="text4" weight="medium" marginBottom={16}>
							No tokens here
						</Text>
					</View>
				)}
				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SearchTokens;
