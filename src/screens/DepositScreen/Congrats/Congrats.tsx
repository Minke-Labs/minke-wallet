import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Text, Button } from '@components';
import { useTheme } from '@hooks';
import { saveCongratsImg } from '@src/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from './Congrats.styles';

const SaveCongratsScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
