import React from 'react';
import { View, FlatList } from 'react-native';
import { Header, FlagItem } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage } from '@hooks';
import { FlagType } from '@styles';
import RNUxcam from 'react-native-ux-cam';
import { languageArr } from './ChangeLanguageScreen.utils';

const ChangeLanguageScreen = () => {
	RNUxcam.tagScreenName('ChangeLanguageScreen');
	const { i18n, language, setLanguage } = useLanguage();

	return (
		<BasicLayout>
			<Header title={i18n.t('ChangeLanguageScreen.header_title')} done />
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
