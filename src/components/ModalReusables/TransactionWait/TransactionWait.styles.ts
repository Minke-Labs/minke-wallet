import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		modalRow: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 24
		},
		modalColumn: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 16
		},
		exchangeResumeBackground: {
			borderRadius: 50,
			padding: 8,
			backgroundColor: colors.background1,
			position: 'absolute'
		}
	});
