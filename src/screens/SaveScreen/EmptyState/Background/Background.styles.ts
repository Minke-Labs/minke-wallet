import { Dimensions, StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		// ... BACKGROUND
		backgroundContainer: {
			height: '100%',
			backgroundColor: colors.background2,
			justifyContent: 'space-between'
		},

		bgImage: {
			width: '100%',
			height: Dimensions.get('screen').height * 0.6,
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1
		}
	});
