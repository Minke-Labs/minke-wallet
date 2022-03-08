import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			height: 40,
			marginBottom: 16,
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.background2,
			borderRadius: 22
		},

		backgroundTag: {
			position: 'absolute',
			backgroundColor: '#006AA6',
			width: 100,
			height: 32,
			borderRadius: 16
		},

		buttonContainer: {
			flex: 1,
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
