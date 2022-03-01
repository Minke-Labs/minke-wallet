import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			height: '100%',
			backgroundColor: colors.background2
		},
		saveCongratsImg: {
			width: '100%',
			height: 501,
			position: 'relative',
			top: 0,
			left: 0,
			zIndex: -1
		},
		congratsMessage: {
			paddingHorizontal: 24,
			paddingVertical: 32
		},
		ctaBottom: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingLeft: 24,
			paddingRight: 24,
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 32,
			zIndex: 20
		}
	});
