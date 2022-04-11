import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader, SearchInput } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { FlagType } from '@styles';
import { ItemCurrency } from './ItemCurrency/ItemCurrency';
import { currencies } from './ChangeCurrencyScreen.utils';

const ChangeCurrencyScreen = () => {
	const [current, setCurrent] = useState('unitedStates');
	const [filtered, setFiltered] = useState<any>();
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
				<SettingsHeader title="Change Currency" onPress={goBack} />
				<View style={{ marginTop: 24, flex: 1 }}>
					<SearchInput
						marginBottom={24}
						placeholder="Search"
						search={search}
						onSearch={(val) => filterCurrencies(val)}
					/>
					<View style={{ flex: 1 }}>
						<FlatList
							data={filtered}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<ItemCurrency
									onPress={() => setCurrent(item.flag)}
									flag={item.flag as FlagType}
									active={item.flag === current}
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
