import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme, useLanguage, useCurrencies } from '@hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Currency } from '@models/types/currency.types';
import { FlagType } from '@src/styles';
import Flag from '../../Flag/Flag';
import ModalHeader from '../../ModalHeader/ModalHeader';
import ScreenLoadingIndicator from '../../ScreenLoadingIndicator/ScreenLoadingIndicator';
import SearchInput from '../../SearchInput/SearchInput';
import Text from '../../Text/Text';
import { makeStyles } from './SearchCurrencies.styles';
import { SearchCurrenciesProps } from './SearchCurrencies.types';

const SearchCurrencies: React.FC<SearchCurrenciesProps> = ({ visible, onDismiss, onCurrencySelect, selected }) => {
	const { i18n } = useLanguage();
	const { currencies } = useCurrencies();
	const [filteredCurrencies, setFilteredCurrencies] = useState<Array<Currency>>();
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const filter = useCallback(() => {
		setLoading(true);
		setFilteredCurrencies(currencies.filter((c) => c.country !== selected?.country));
		setLoading(false);
	}, [currencies, selected]);

	useEffect(() => {
		filter();
	}, [selected]);

	useEffect(() => {
		setSearch('');
	}, [visible]);

	const onSearch = (text: string) => {
		setSearch(text);
		let source;
		if (text) {
			source = currencies.filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()));
		} else {
			source = currencies;
		}
		setFilteredCurrencies((source || []).filter(({ country }) => country !== selected?.country));
	};

	const countryName = (id: string) => {
		const capitalized = id.charAt(0).toUpperCase() + id.slice(1);
		return capitalized.split(/(?=[A-Z])/).join(' ');
	};

	if (!visible) {
		return null;
	}

	if (!currencies || loading) {
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
					data={filteredCurrencies}
					keyExtractor={(currency) => currency.name}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => onCurrencySelect(item)} style={styles.tokenItem}>
							<View style={{ marginRight: 16 }}>
								<Flag size={40} name={item.country as FlagType} />
							</View>
							<View style={styles.tokenItemNameContainer}>
								<Text style={styles.tokenItemSymbol}>{countryName(item.country)}</Text>
								<Text style={styles.tokenItemName}>{item.name}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>

				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SearchCurrencies;
