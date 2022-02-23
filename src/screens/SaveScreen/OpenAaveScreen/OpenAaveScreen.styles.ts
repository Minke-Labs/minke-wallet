import { StyleSheet } from 'react-native';
import { ColorType } from '@src/styles';
import { height } from '@src/screens/Test/Chart/Graph.utils';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			padding: 24,
			height: '100%'
		},
		linearGradient: {
			height: '100%'
		},
		headerNavegation: {
			paddingTop: 56,
			flexDirection: 'row',
			marginBottom: 16
		},
		header: {
			marginBottom: 32
		},
		transparentCard: {
			backgroundColor: 'rgba(255, 255, 255, 0.12)'
		},
		whatsAave: {
			borderRadius: 16,
			padding: 24,
			marginBottom: 16
		},
		actionContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 16
		},
		actionOpenAave: {
			flexDirection: 'row',
			alignContent: 'center',
			justifyContent: 'center',
			padding: 16,
			borderRadius: 16
		},
		actionTextButton: {
			paddingTop: 0,
			paddingRight: 4,
			paddingBottom: 0,
			paddingLeft: 4
		},
		ctaBottom: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingLeft: 24,
			paddingRight: 24,
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 32
		},
		fontSizeSmall: {
			fontSize: 14
		},
		subtract: {
			width: 344,
			height: 499,
			position: 'absolute',
			bottom: -56,
			right: -56,
			zIndex: -1
		}
	});
