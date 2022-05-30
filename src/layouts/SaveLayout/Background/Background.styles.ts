import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		// ... BACKGROUND
		backgroundContainer: {
			height: '100%',
			backgroundColor: colors.background1,
			justifyContent: 'space-between'
		},

		// BACKGROUND
		imagesContainer: {
			flex: 0.6
		},

		bgImage: {
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1
		},

		krakenImage: {
			width: '100%',
			height: 387,
			position: 'absolute',
			bottom: 0,
			overflow: 'visible',
			resizeMode: 'contain'
		},

		// CONTENT
		contentContainer: {
			flex: 0.4
		}
	});
