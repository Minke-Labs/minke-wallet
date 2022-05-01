import React from 'react';
import { View } from 'react-native';
import { SettingsHeader } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { FlagItem } from './FlagItem/FlagItem';

const ChangeCurrencyScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	return (
		<BasicLayout>
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<SettingsHeader title="Change Currency" onPress={goBack} />
				<View style={{ marginTop: 24, flex: 1 }}>
					<View style={{ flex: 1 }}>
						{/* <FlatList
							data={filtered}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<ItemCurrency
									onPress={() => console.log('CLICOU!')}
									flag="brazil"
									active={false}
									title="Portuguese"
								/>
							)}
							keyExtractor={(item) => item.flag}
						/> */}
						<FlagItem
							onPress={() => console.log('CLICOU!')}
							flag="unitedStates"
							active={false}
							title="English (US)"
						/>
						<FlagItem
							onPress={() => console.log('CLICOU!')}
							flag="brazil"
							active={false}
							title="Portuguese (BR)"
						/>
					</View>
				</View>
			</View>
		</BasicLayout>
	);
};

export default ChangeCurrencyScreen;
