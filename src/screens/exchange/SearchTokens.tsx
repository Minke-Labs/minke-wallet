import React, { useState, useEffect } from 'react';
import { Portal, Modal, TextInput, IconButton } from 'react-native-paper';
import { FlatList, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import _ from 'lodash';
import { paraswapTokens, ParaswapToken } from '../../model/token';

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
	// eslint-disable-next-line react/require-default-props
	ownedTokens?: Array<string>;
	// eslint-disable-next-line react/require-default-props
	selected?: Array<string | undefined>;
}) => {
	const containerStyle = { backgroundColor: 'white', padding: 20 };
	const [tokens, setTokens] = useState<Array<ParaswapToken>>();
	const [filteredTokens, setFilteredTokens] = useState<Array<ParaswapToken>>();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadTokens = async () => {
			setLoading(true);
			const allTokens = (await paraswapTokens()).tokens;
			setTokens(allTokens);
			setFilteredTokens(allTokens);
			setLoading(false);
		};
		loadTokens();
	}, []);

	useEffect(() => {
		const filterTokens = async () => {
			setLoading(true);
			let filter = tokens;
			if (showOnlyOwnedTokens) {
				filter = _.filter(filter, (token) => ownedTokens.includes(token.symbol.toLocaleLowerCase()));
			}

			if (selected && selected.length > 0) {
				filter = _.filter(filter, (token) => !selected.includes(token.symbol.toLocaleLowerCase()));
			}
			setFilteredTokens(filter);
			setLoading(false);
		};
		filterTokens();
	}, [ownedTokens, selected]);

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
		<Portal>
			<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
				<TextInput
					placeholder="Search token"
					value={search}
					onChangeText={(text) => onSearch(text)}
					left={<TextInput.Icon name="magnify" />}
				/>

				<IconButton icon="close" size={20} color="#006AA6" onPress={onDismiss} />
				<FlatList
					data={filteredTokens}
					keyExtractor={(token) => token.symbol}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => onTokenSelect(item)}>
							<Image source={{ uri: item.img }} style={{ width: 50, height: 50 }} />
							<Text>{item.symbol}</Text>
						</TouchableOpacity>
					)}
				/>
			</Modal>
		</Portal>
	);
};

export default SearchTokens;
