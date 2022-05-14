import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader, SearchInput, FlagItem } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLanguage } from '@hooks';
import { FlagType } from '@styles';
import { Country } from '../../contexts/LanguageContext/LanguageContext.types';

const ChangeCountryScreen = () => {
	const { i18n, countries, countryCode, setCountryCode } = useLanguage();
	const [filtered, setFiltered] = useState<any>(countries);
	const [search, setSearch] = useState('');

	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	const filterCurrencies = (text: string) => {
		const newCurrencies = countries.filter((country: Country) =>
			country.currencyName.toLowerCase().includes(text.toLowerCase()));
		setSearch(text);
		setFiltered(newCurrencies);
	};

	return (
		<BasicLayout>
			<View style={{ flex: 1 }}>
				<SettingsHeader title={i18n.t('ChangeCountryScreen.header_title')} onPress={goBack} />
				<View style={{ marginTop: 24, flex: 1, paddingHorizontal: 16 }}>
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
								<FlagItem
									onPress={() => setCountryCode(item.iso)}
									flag={item.flag as FlagType}
									active={item.iso === countryCode}
									title={item.name}
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

export default ChangeCountryScreen;
