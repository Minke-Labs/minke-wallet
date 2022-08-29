import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Text, Button } from '@components';
import { useTheme, useNavigation, useLanguage } from '@hooks';
import { saveCongratsImg } from '@src/images';
import { makeStyles } from './Congrats.styles';

const SaveCongratsScreen = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<ImageBackground source={saveCongratsImg} style={styles.saveCongratsImg} />
			<View style={styles.congratsMessage}>
				<Text center type="h2" weight="bold" color="text2" mb="s">
					{i18n.t('DepositScreen.Congrats.congrats')}
				</Text>
				<Text center color="text2" mb="s">
					{i18n.t('DepositScreen.Congrats.you_just')}
				</Text>
			</View>
			<View style={styles.ctaBottom}>
				<Button
					title={i18n.t('DepositScreen.Congrats.done')}
					onPress={() => navigation.goBack()}
				/>
			</View>
		</View>
	);
};

export default SaveCongratsScreen;
