import React from 'react';
import { View, ImageBackground, Image, SafeAreaView } from 'react-native';
import { useTheme, useDepositProtocols, useLanguage, useNavigation } from '@hooks';
import { wavesBackground, krakenAave2, krakenMStable } from '@images';
import { Header } from '@components';
import { makeStyles } from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { i18n } = useLanguage();
	const { selectedProtocol } = useDepositProtocols();
	return (
		<View style={styles.backgroundContainer}>
			<View style={styles.imagesContainer}>
				<ImageBackground source={wavesBackground} style={styles.bgImage} />
				<Image
					source={selectedProtocol?.id === 'aave' ? krakenAave2 : krakenMStable}
					style={styles.krakenImage}
				/>
				<View>
					<SafeAreaView />
					<Header
						onPress={() => navigation.goBack()}
						title={i18n.t('SaveScreen.Header.save')}
					/>
				</View>
			</View>
			<View style={styles.contentContainer}>{children}</View>
		</View>
	);
};
