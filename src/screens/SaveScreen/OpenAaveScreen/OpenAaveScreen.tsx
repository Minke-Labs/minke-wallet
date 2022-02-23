import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { makeStyles } from './OpenAaveScreen.styles';
import subtract from './subtract.png';

const OpenAaveScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
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
			<View style={styles.container}>
				<View style={styles.headerNavegation}>
					<TouchableOpacity style={styles.headerNavegationLeft} onPress={() => navigation.goBack()}>
						<Icon name="chevronLeft" color="cta1" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.header}>
					<Text type="h2" weight="bold" color="text1">
						Open Aave
					</Text>
					<Text type="h2" weight="bold" color="text1">
						Savings Account
					</Text>
				</View>

				<View style={[styles.transparentCard, styles.whatsAave]}>
					<Text type="h3" weight="bold" color="text1" marginBottom={24}>
						What is Aave
					</Text>
					<Text color="text1" style={styles.fontSizeSmall} marginBottom={16}>
						Aave lets you earn interest on your crypto and stablecoins by lending it to borrowers. Aave is a
						decentralized protocol for lending and borrowing crypto. Rates are variable and can change at
						any time.
					</Text>
					<Text color="text1" style={styles.fontSizeSmall}>
						Risks include the economics of the protocol, market risks, security of the smart contracts,
						counterparty risk and more. Aave has been audited by Trail of Bits and Open Zeppelin.
					</Text>
				</View>

				<View style={styles.actionContainer}>
					<TouchableOpacity style={[styles.transparentCard, styles.actionOpenAave]}>
						<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text color="text2" style={styles.fontSizeSmall}>
							View Site
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TouchableOpacity>

					<TouchableOpacity style={[styles.transparentCard, styles.actionOpenAave]}>
						<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text color="text2" style={styles.fontSizeSmall}>
							Learn More
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.ctaBottom}>
					<Button iconRight="arrowRight" title="Open account" marginBottom={16} />
					<Text color="text2" style={styles.fontSizeSmall}>
						This transaction will cost a few cents
					</Text>
				</View>
			</View>
			<ImageBackground source={subtract} style={styles.subtract} />
		</LinearGradient>
	);
};

export default OpenAaveScreen;
