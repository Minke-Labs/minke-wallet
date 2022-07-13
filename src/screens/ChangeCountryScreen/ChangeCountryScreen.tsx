import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader, SearchInput, FlagItem } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLanguage, useCountry } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { FlagType } from '@styles';
import { Country } from '../../contexts/LanguageContext/LanguageContext.types';

const ChangeCountryScreen = () => {
	const { setCountry, country } = useCountry();
	const { i18n, countries } = useLanguage();
	const [filtered, setFiltered] = useState<any>(countries);
	const [search, setSearch] = useState('');
	RNUxcam.tagScreenName('ChangeCountryScreen');

	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	const filterCountries = (text: string) => {
		const newCountries = countries.filter((c: Country) =>
			c.name.toLowerCase().includes(text.toLowerCase()));
		setSearch(text);
		setFiltered(newCountries);
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
						onSearch={(val) => filterCountries(val)}
					/>
					<View style={{ flex: 1 }}>
						<FlatList
							data={filtered}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<FlagItem
									onPress={() => setCountry(item.iso)}
									flag={item.flag as FlagType}
									active={item.iso === country}
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
