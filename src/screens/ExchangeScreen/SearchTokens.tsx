import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { Modal, ModalHeader } from '@components';
import { useTheme } from '@hooks';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import _ from 'lodash';
import { paraswapTokens, ParaswapToken } from '@models/token';
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
			setFilteredTokens(tokens);
		}
	};

	if (!tokens || loading) {
		return <AppLoading />;
	}

	return (
		<Modal isVisible={visible} onDismiss={onDismiss}>
			<SafeAreaView>
				<ModalHeader {...{ onDismiss }} />
				<View style={{}}>
					<TextInput
						style={styles.searchBar}
						underlineColorAndroid="transparent"
						placeholder="Search tokens"
						placeholderTextColor={colors.cta3}
						value={search}
						onChangeText={(text) => onSearch(text)}
						left={<TextInput.Icon name="magnify" />}
					/>

					<FlatList
						data={filteredTokens}
						keyExtractor={(token) => token.symbol}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => onTokenSelect(item)} style={styles.tokenItem}>
								<Image source={{ uri: item.img }} style={styles.tokenItemImage} />
								<View style={styles.tokenItemNameContainer}>
									<Text style={styles.tokenItemSymbol}>{item.symbol}</Text>
									<Text style={styles.tokenItemName}>{item.symbol}</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default SearchTokens;
