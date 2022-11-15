/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, SafeAreaView, SectionList } from 'react-native';
import { useTheme, useLanguage, useBalances, useGlobalWalletState } from '@hooks';
import _ from 'lodash';
import { tokenList } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
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
	chainId,
	withdraw = false,
	enableSections = false
}) => {
	const { i18n } = useLanguage();
	const [tokens, setTokens] = useState<Array<MinkeToken>>();
	const [filteredTokens, setFilteredTokens] = useState<Array<MinkeToken>>();
	const [hideOtherTokens, setHideOtherTokens] = useState(true);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const { withdrawableTokens } = useBalances();
	const { colors } = useTheme();
	const { network } = useGlobalWalletState();
	const styles = makeStyles(colors);
	const flatListRef = useRef<FlatList>(null);
	const sectionListRef = useRef<SectionList>(null);

	const removeSelectedTokens = useCallback(
		(allTokens: MinkeToken[]) => {
			let selectedTokens: MinkeToken[] = allTokens || [];
			if (showOnlyOwnedTokens) {
				selectedTokens = ownedTokens;
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

	const priorities = ['MATIC', 'ETH', 'BUSD', 'DAI', 'USDT', 'USDC'];
	const suggestedAddresses = network.suggestedTokens.map(({ address }) => address.toLowerCase());

	useEffect(() => {
		const loadTokens = async () => {
			if (withdraw || (tokens || []).length === 0) {
				setLoading(true);
				const allTokens = withdraw
					? withdrawableTokens
					: (await tokenList(chainId || network.chainId)).sort(
							(a, b) =>
								priorities.indexOf(b.symbol.toUpperCase()) -
									priorities.indexOf(a.symbol.toUpperCase()) ||
								suggestedAddresses.indexOf(b.address.toLowerCase()) -
									suggestedAddresses.indexOf(a.address.toLowerCase())
					  );

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
		flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
		sectionListRef.current?.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: 0 });
	};

	if (!visible) {
		return null;
	}

	if (!tokens || loading) {
		return <ScreenLoadingIndicator />;
	}

	const query = search.toLowerCase();
	const searchTokens = query
		? _.filter(
				filteredTokens,
				(token) => token.symbol.toLowerCase().includes(query) || (token.name || '').includes(query)
		  )
		: filteredTokens;

	const partition = (ary: MinkeToken[], callback: (t: MinkeToken) => boolean) =>
		ary.reduce(
			(acc, e) => {
				// @ts-ignore
				acc[callback(e) ? 0 : 1].push(e);
				return acc;
			},
			[[], []]
		);
	const [visibleTokens, otherTokens] = partition(
		searchTokens || [],
		({ symbol, address }: MinkeToken) =>
			priorities.includes(symbol) || suggestedAddresses.includes(address.toLowerCase())
	);

	const othersLabel = i18n.t('Components.Inputs.others');

	const tokensList = [
		{ title: '', data: visibleTokens },
		{ title: othersLabel, data: otherTokens }
	];

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View pl="s" pr="s">
				<SearchInput
					marginBottom={24}
					placeholder={i18n.t('Components.Inputs.search_token')}
					{...{ search, onSearch }}
				/>
				{enableSections ? (
					<SectionList
						ref={sectionListRef}
						sections={tokensList}
						style={styles.list}
						showsVerticalScrollIndicator={false}
						keyExtractor={(token: MinkeToken) => `${token.address}-${token.chainId}`}
						renderItem={({ item, section }) => {
							const nw = Object.values(networks).find((n) => n.chainId === item.chainId);
							if (hideOtherTokens && section.title === othersLabel && !search) {
								return <></>;
							}
							return (
								<Touchable onPress={() => onTokenSelect(item)} style={styles.tokenItem}>
									<View mr="xs">
										<Token token={item} size={40} />
									</View>
									<View style={styles.tokenItemNameContainer}>
										<Text style={styles.tokenItemSymbol}>
											{item.name || item.symbol} {!!nw && `- ${nw.name}`}
										</Text>
										<Text style={styles.tokenItemName}>{item.symbol}</Text>
									</View>
								</Touchable>
							);
						}}
						// @ts-ignore
						renderSectionHeader={({ section: { title, data } }) =>
							!!title &&
							data.length > 0 && (
								<Touchable
									onPress={() => setHideOtherTokens(!hideOtherTokens)}
									row
									mb="xs"
									cross="center"
								>
									<View>
										<Text color="text1" weight="bold" type="bMedium">
											{title}
										</Text>
									</View>

									<View w={24}>
										<Icon name={hideOtherTokens ? 'chevronRight' : 'chevronDown'} size={24} />
									</View>
								</Touchable>
							)
						}
					/>
				) : (
					<FlatList
						ref={flatListRef}
						style={styles.list}
						showsVerticalScrollIndicator={false}
						keyExtractor={(token: MinkeToken) => `${token.address}-${token.chainId}`}
						data={searchTokens}
						renderItem={({ item }) => {
							const nw = Object.values(networks).find((n) => n.chainId === item.chainId);
							return (
								<Touchable onPress={() => onTokenSelect(item)} style={styles.tokenItem}>
									<View style={{ marginRight: 16 }}>
										<Token token={item} size={40} />
									</View>
									<View style={styles.tokenItemNameContainer}>
										<Text style={styles.tokenItemSymbol}>
											{item.name || item.symbol} {!!nw && `- ${nw.name}`}
										</Text>
										<Text style={styles.tokenItemName}>{item.symbol}</Text>
									</View>
								</Touchable>
							);
						}}
					/>
				)}

				{(searchTokens || []).length === 0 && <EmptyStates.NoTokens />}
				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SearchTokens;
