/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader, SearchInput, FlagItem, Text } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage } from '@hooks';
import { FlagType, allCountries } from '@styles';
// import { Country } from '../../contexts/LanguageContext/LanguageContext.types';

const CountryScreen = () => {
	const {
		i18n,
		countries,
		countryCode
		// setCountryCode
	} = useLanguage();
	const [filtered, setFiltered] = useState<any>(countries);
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState('');

	// const filterCountries = (text: string) => {
	// 	const newCountries = countries.filter((country: Country) =>
	// 		country.name.toLowerCase().includes(text.toLowerCase()));
	// 	setSearch(text);
	// 	setFiltered(newCountries);
	// };

	return (
		<BasicLayout>
			<View style={{ flex: 1 }}>
				<SettingsHeader title="Country" onPress={() => null} />
				<View style={{ marginTop: 24, flex: 1, paddingHorizontal: 16 }}>
					<Text type="bMedium" marginBottom={24}>
						To offer you the best options to buy crypto please select your country of residence:
					</Text>
					<SearchInput
						marginBottom={24}
						placeholder={i18n.t('Components.Inputs.search')}
						search={search}
						// onSearch={(val) => filterCountries(val)}
						onSearch={() => null}
					/>
					<View style={{ flex: 1 }}>
						<FlatList
							data={allCountries}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<FlagItem
									onPress={() => setSelected(item.flag)}
									flag={item.flag as FlagType}
									active={item.flag === selected}
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

export default CountryScreen;
