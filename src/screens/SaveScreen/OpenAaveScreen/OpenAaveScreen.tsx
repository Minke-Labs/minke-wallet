import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { aaveGhost } from '@src/images';
import styles from './OpenAaveScreen.styles';

const OpenAaveScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<LinearGradient
			colors={[
				'rgba(223, 191, 206, 1)',
				'rgba(205, 159, 192, 1)',
				'rgba(185, 197, 207, 1)',
				'rgba(143, 204, 208, 1)'
			]}
			style={styles.linearGradient}
		>
			<ImageBackground source={aaveGhost} style={styles.subtract} />
			<View style={styles.container}>
				<View style={styles.headerNavegation}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="chevronLeft" color="cta1" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.header}>
					<Text type="h3" weight="bold" color="text1">
						Open Aave Savings Account
					</Text>
				</View>

				<View style={[styles.transparentCard, styles.whatsAave]}>
					<Text type="p" weight="bold" color="text1" marginBottom={24}>
						What is Aave
					</Text>
					<Text type="a" color="text1" marginBottom={16}>
						Aave lets you earn interest on your crypto and stablecoins by lending it to borrowers. Aave is a
						decentralized protocol for lending and borrowing crypto. Rates are variable and can change at
						any time.
					</Text>
					<Text type="a" color="text1">
						Risks include the economics of the protocol, market risks, security of the smart contracts,
						counterparty risk and more. Aave has been audited by Trail of Bits and Open Zeppelin.
					</Text>
				</View>

				<View style={styles.actionContainer}>
					<TouchableOpacity style={[styles.transparentCard, styles.actionOpenAave]}>
						<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text type="a" color="text2">
							View Site
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TouchableOpacity>

					<TouchableOpacity style={[styles.transparentCard, styles.actionOpenAave]}>
						<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text type="a" color="text2">
							Learn More
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 'auto', marginBottom: 12 }}>
					<Button
						iconRight="arrowRight"
						title="Open account"
						marginBottom={16}
						onPress={() => navigation.navigate('Deposit')}
					/>
					<Text type="span" color="text2">
						This transaction will cost a few cents when you confirm your deposit
					</Text>
				</View>
			</View>
		</LinearGradient>
	);
};

export default OpenAaveScreen;
