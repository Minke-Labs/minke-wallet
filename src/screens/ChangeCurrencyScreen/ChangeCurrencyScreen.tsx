import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader, SearchInput } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLocation, useLanguage } from '@hooks';
import { FlagType } from '@styles';
import { ItemCurrency } from './ItemCurrency/ItemCurrency';

const ChangeCurrencyScreen = () => {
	const { countryCode, setCountryCode, currencies } = useLocation();
	const { i18n } = useLanguage();
	const [filtered, setFiltered] = useState<any>(currencies);
	const [search, setSearch] = useState('');

	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	const filterCurrencies = (text: string) => {
		const newCurrencies = currencies.filter((currency) =>
			currency.currencyName.toLowerCase().includes(text.toLowerCase()));
		setSearch(text);
		setFiltered(newCurrencies);
	};

	return (
		<BasicLayout>
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<SettingsHeader title={i18n.t('ChangeCurrencyScreen.header_title')} onPress={goBack} />
				<View style={{ marginTop: 24, flex: 1 }}>
					<SearchInput
						marginBottom={24}
						placeholder={i18n.t('Components.Inputs.search')}
						search={search}
						onSearch={(val) => filterCurrencies(val)}
					/>
					<View style={{ flex: 1 }}>
						<FlatList
							data={filtered}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<ItemCurrency
									onPress={() => setCountryCode(item.iso)}
									flag={item.flag as FlagType}
									active={item.iso === countryCode}
									currencyName={item.currencyName}
								/>
							)}
							keyExtractor={(item) => item.flag}
						/>
					</View>
				</View>
			</View>
		</BasicLayout>
	);
};

export default ChangeCurrencyScreen;
