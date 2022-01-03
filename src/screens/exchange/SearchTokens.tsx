import React, { useState, useEffect } from 'react';
import { Modal, TextInput, IconButton } from 'react-native-paper';
import { FlatList, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import _ from 'lodash';
import { paraswapTokens, ParaswapToken } from '../../model/token';

const SearchTokens = ({
	visible,
	onDismiss,
	onTokenSelect
}: {
	visible: boolean;
	onDismiss: any;
	onTokenSelect: Function;
}) => {
	const containerStyle = { backgroundColor: 'white', padding: 20 };
	const [tokens, setTokens] = useState<Array<ParaswapToken>>();
	const [filteredTokens, setFilteredTokens] = useState<Array<ParaswapToken>>();
	const [search, setSearch] = useState('');

	useEffect(() => {
		const loadTokens = async () => {
			const allTokens = (await paraswapTokens()).tokens;
			setTokens(allTokens);
			setFilteredTokens(allTokens);
		};
		loadTokens();
	}, []);

	const onSearch = (text: string) => {
		setSearch(text);

		if (text) {
			const data = _.filter(tokens, (token) => token.symbol.toLowerCase().includes(text.toLowerCase()));
			setFilteredTokens(data);
		} else {
			setFilteredTokens(tokens);
		}
	};

	if (!tokens) {
		return <AppLoading />;
	}

	return (
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
	);
};

export default React.memo(SearchTokens);
