import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { FlagType, allCountries } from '@styles';
import { useLanguage, useCountry } from '@hooks';
import SettingsHeader from '../SettingsHeader/SettingsHeader';
import SearchInput from '../SearchInput/SearchInput';
import Text from '../Text/Text';
import FlagItem from '../FlagItem/FlagItem';

const CountrySelector = () => {
	const { country, setCountry } = useCountry();
	const [filtered, setFiltered] = useState<any>(allCountries);
	const { i18n } = useLanguage();
	const [search, setSearch] = useState('');

	const filteredCountries = (text: string) => {
		const newCountries = allCountries.filter((item: any) =>
			item.name.toLowerCase().includes(text.toLowerCase()));
		setSearch(text);
		setFiltered(newCountries);
	};

	return (
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
					onSearch={(val) => filteredCountries(val)}
				/>
				<View style={{ flex: 1 }}>
					<FlatList
						data={filtered}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<FlagItem
								onPress={() => setCountry(item.flag)}
								flag={item.flag as FlagType}
								active={item.flag === country}
								title={item.name}
							/>
						)}
						keyExtractor={(item) => item.flag}
					/>
				</View>
			</View>
		</View>
	);
};

export default CountrySelector;
