import React from 'react';
import { View, ImageBackground, Image, SafeAreaView } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { wavesBackground, krakenMStable } from '@images';
import { Header } from '@components';
import { makeStyles } from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { i18n } = useLanguage();
	return (
		<View style={styles.backgroundContainer}>
			<View style={styles.imagesContainer}>
				<ImageBackground source={wavesBackground} style={styles.bgImage} />
				<Image source={krakenMStable} style={styles.krakenImage} />
				<View>
					<SafeAreaView />
					<Header title={i18n.t('SaveScreen.Header.save')} />
				</View>
			</View>
			<View style={styles.contentContainer}>{children}</View>
		</View>
	);
};
