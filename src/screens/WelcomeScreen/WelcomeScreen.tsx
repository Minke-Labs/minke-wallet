import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { WelcomeTemplate } from '@templates';
import { welcomeImg, waveWelcomeHeaderDarkImg, waveWelcomeHeaderImg } from '@images';
import { Text, Token } from '@components';
import styles from './WelcomeScreen.styles';
// import PrimaryButton from './PrimaryButton';

const WelcomeScreen = () => {
	const scheme = useColorScheme();

	return (
		<WelcomeTemplate>
			<View style={styles.content}>
				<Image source={welcomeImg} style={styles.headerImage} />
				<Image
					source={scheme === 'dark' ? waveWelcomeHeaderDarkImg : waveWelcomeHeaderImg}
					style={styles.backgroundTop}
				/>
				<View style={styles.textContainer}>
					<Text
						weight="extraBold"
						type="h1"
						width={273}
						marginBottom={16}
						// style={{ borderColor: 'red', borderWidth: 1 }}
					>
						Wave goodbye to your bank!
					</Text>
					<Text color="placeholder" width={198} marginBottom={40}>
						Easily save, spend and invest with
						<Text weight="extraBold"> Minke </Text>
					</Text>
					{/* <PrimaryButton onPress={() => console.log('CLICOU!!!')}>Create Wallet</PrimaryButton> */}
					<Token name="xbc" size={200} />
				</View>
			</View>
		</WelcomeTemplate>
	);
};

export default WelcomeScreen;
