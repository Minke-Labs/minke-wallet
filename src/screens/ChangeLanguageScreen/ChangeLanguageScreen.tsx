import React from 'react';
import { View, FlatList } from 'react-native';
import { SettingsHeader, FlagItem } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLanguage } from '@hooks';
import { FlagType } from '@styles';
import RNUxcam from 'react-native-ux-cam';
import { languageArr } from './ChangeLanguageScreen.utils';

const ChangeLanguageScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();
	const { i18n, language, setLanguage } = useLanguage();
	RNUxcam.tagScreenName('ChangeLanguageScreen');

	return (
		<BasicLayout>
			<SettingsHeader title={i18n.t('ChangeLanguageScreen.header_title')} onPress={goBack} />
			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<View style={{ marginTop: 24, flex: 1 }}>
					<View style={{ flex: 1 }}>
						<FlatList
							data={languageArr}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<FlagItem
									onPress={() => setLanguage(item.id)}
									flag={item.flag as FlagType}
									active={language === item.id}
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
