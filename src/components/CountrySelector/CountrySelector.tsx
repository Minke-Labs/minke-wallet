import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { FlagType, allCountries } from '@styles';
import { useLanguage, useCountry } from '@hooks';
import SearchInput from '../SearchInput/SearchInput';
import Text from '../Text/Text';
import FlagItem from '../FlagItem/FlagItem';

interface CountrySelectorProps {
	limitHeight?: boolean;
	desc?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ limitHeight, desc }) => {
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
			{desc && (
				<Text type="bMedium" marginBottom={24}>
					{i18n.t('Components.CountrySelector.to_offer')}
				</Text>
			)}
			<SearchInput
				marginBottom={24}
				placeholder={i18n.t('Components.Inputs.search')}
				search={search}
				onSearch={(val) => filteredCountries(val)}
			/>
			<View style={{ flex: 1 }}>
				<FlatList
					style={{ ...(limitHeight && { maxHeight: 500 }) }}
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
	);
};

export default CountrySelector;
