import React from 'react';
import { View, ImageBackground, useColorScheme } from 'react-native';
import { Text, Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { useTheme } from '@hooks';
import { bgSaveBackground, bgSaveBackgroundDark } from '@images';
import { makeStyles } from './DepositSuccess.styles';

const DepositSuccess = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const scheme = useColorScheme();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<ImageBackground
				source={scheme === 'dark' ? bgSaveBackgroundDark : bgSaveBackground}
				style={styles.bgSaveEmptyScreen}
			/>
			<View style={styles.saveEmptyStateContent}>
				<View style={styles.saveEmptyStateCard}>
					<Text type="h1" weight="extraBold" color="text1" marginBottom={32} style={styles.textCenter}>
						Congrats!
					</Text>
					<Text type="p2" color="text3" marginBottom={32} style={styles.textCenter}>
						You&apos;ve made your deposit!
					</Text>

					<View style={{ marginTop: 'auto', width: '100%', marginBottom: 48 }}>
						<Button title="Done" onPress={() => navigation.navigate('Wallet')} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default DepositSuccess;