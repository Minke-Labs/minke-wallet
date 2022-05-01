import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { FlagType } from '@styles';
import i18n from '@localization';
import { FlagItem } from './FlagItem/FlagItem';
import { languageArr } from './ChangeLanguageScreen.utils';

const ChangeLanguageScreen = () => {
	const [selected, setSelected] = useState('en');
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	return (
		<BasicLayout>
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<SettingsHeader
					title={i18n.t('ChangeLanguageScreen.header_title')}
					onPress={goBack}
				/>
				<View style={{ marginTop: 24, flex: 1 }}>
					<View style={{ flex: 1 }}>
						<FlatList
							data={languageArr}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<FlagItem
									onPress={() => setSelected(item.id)}
									flag={item.flag as FlagType}
									active={selected === item.id}
									title={item.title}
								/>
							)}
							keyExtractor={(item) => item.id}
						/>
					</View>
				</View>
			</View>
		</BasicLayout>
	);
};

export default ChangeLanguageScreen;
