import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FlagType, allCountries } from '@styles';
import { useLanguage, useCountry, useNavigation } from '@hooks';
import SettingsHeader from '../SettingsHeader/SettingsHeader';
import SearchInput from '../SearchInput/SearchInput';
import Text from '../Text/Text';
import FlagItem from '../FlagItem/FlagItem';

const CountrySelector = () => {
	const navigation = useNavigation();
	const { country, setCountry } = useCountry();
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [filtered, setFiltered] = useState<any>(allCountries);
	const { i18n } = useLanguage();
	const [search, setSearch] = useState('');

	const filteredCountries = (text: string) => {
		const newCountries = allCountries.filter((item: any) =>
			item.name.toLowerCase().includes(text.toLowerCase()));
		setSearch(text);
		setFiltered(newCountries);
	};

	const handlePress = () => {
		if (!country) {
			setSnackbarVisible(true);
		} else {
			navigation.navigate('WalletScreen');
		}
	};

	return (
		<>
			<View style={{ flex: 1 }}>
				<SettingsHeader
					title={i18n.t('Components.CountrySelector.country')}
					onPress={handlePress}
				/>
				<View style={{ marginTop: 24, flex: 1, paddingHorizontal: 16 }}>
					<Text type="bMedium" marginBottom={24}>
						{i18n.t('Components.CountrySelector.to_offer')}
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
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">{i18n.t('Components.CountrySelector.select')}</Text>
			</Snackbar>
		</>
	);
};

export default CountrySelector;
