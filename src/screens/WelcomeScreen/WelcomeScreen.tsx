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
import { Text, Button, Modal } from '@components';
import styles from './WelcomeScreen.styles';
// import ModalOld from '../../components/Modal';

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
	const [isModalVisible, setModalVisible] = useState(false);

	return (
		<>
			<WelcomeLayout>
				<Background>
					<View style={styles.container}>
						<View style={{ width: '100%' }}>
							<Image source={welcomeImg} style={styles.headerImage} />
						</View>

						<View style={styles.textContainer}>
							<Text weight="extraBold" type="h1" width={273} marginBottom={16}>
								Wave goodbye to your bank!
							</Text>
							<Text color="placeholder" width={198}>
								Easily save, spend and invest with
								<Text weight="extraBold"> Minke </Text>
							</Text>
						</View>

						<View style={styles.buttonContainer}>
							<Button
								title="Create Wallet"
								onPress={() => console.log('Create Wallet!')}
								marginBottom={14}
								// iconRight="cloudStroke"
							/>
							<Button title="Import Wallet" mode="text" onPress={() => setModalVisible(true)} />
						</View>
					</View>
				</Background>
			</WelcomeLayout>

			<Modal visible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
				<View style={{ height: 500 }} />
			</Modal>
		</>
	);
};

export default WelcomeScreen;
