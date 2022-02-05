/* eslint-disable no-console */
import React, { useState } from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { WelcomeLayout } from '@layouts';
import {
	welcomeImg,
	waveWelcomeHeaderImg,
	waveWelcomeHeaderDarkImg,
	waveWelcomeFooterImg,
	waveWelcomeFooterDarkImg
} from '@images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button, Modal } from '@components';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types.routes';
import styles from './WelcomeScreen.styles';
import ImportFlow from './ImportFlow';

const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<View style={styles.backgroundContainer}>
			<Image
				source={scheme === 'dark' ? waveWelcomeHeaderDarkImg : waveWelcomeHeaderImg}
				style={styles.backgroundTop}
			/>
			<Image
				source={scheme === 'dark' ? waveWelcomeFooterDarkImg : waveWelcomeFooterImg}
				style={styles.backgroundBottom}
			/>
			{children}
		</View>
	);
};

const WelcomeScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [isModalVisible, setModalVisible] = useState(false);

	const onImportFinished = () => {
		setModalVisible(false);
		navigation.navigate('WalletCreated');
	};

	return (
		<>
			<WelcomeLayout>
				<Background>
					<View style={styles.container}>
						<View style={{ width: '100%' }}>
							<Image source={welcomeImg} style={styles.headerImage} />
						</View>

						<View style={styles.textContainer}>
							<Text center weight="extraBold" type="h1" width={273} marginBottom={16}>
								Wave goodbye to your bank!
							</Text>
							<Text center color="placeholder" width={198}>
								Easily save, spend and invest with
								<Text weight="extraBold"> Minke </Text>
							</Text>
						</View>

						<View style={styles.buttonContainer}>
							<Button
								title="Create Wallet"
								onPress={() => console.log('Create Wallet!')}
								marginBottom={14}
							/>
							<Button title="Import Wallet" mode="text" onPress={() => setModalVisible(true)} />
						</View>
					</View>
				</Background>
			</WelcomeLayout>

			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<ImportFlow onImportFinished={onImportFinished} />
			</Modal>
		</>
	);
};

export default WelcomeScreen;
