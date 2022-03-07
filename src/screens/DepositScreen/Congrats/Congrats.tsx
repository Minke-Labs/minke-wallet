import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Text, Button } from '@components';
import { useTheme, useNavigation } from '@hooks';
import { saveCongratsImg } from '@src/images';
import { makeStyles } from './Congrats.styles';

const SaveCongratsScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<ImageBackground source={saveCongratsImg} style={styles.saveCongratsImg} />
			<View style={styles.congratsMessage}>
				<Text center type="h2" weight="bold" color="text2" marginBottom={24}>
					Congrats
				</Text>
				<Text center color="text2" marginBottom={24}>
					You&apos;ve made your first deposit!
				</Text>
			</View>
			<View style={styles.ctaBottom}>
				<Button title="Done" onPress={() => navigation.goBack()} />
			</View>
		</View>
	);
};

export default SaveCongratsScreen;
