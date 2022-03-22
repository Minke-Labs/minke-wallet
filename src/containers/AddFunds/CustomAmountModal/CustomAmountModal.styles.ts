import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		currencyInput: {
			borderBottomColor: colors.text1,
			borderBottomWidth: 1,
			paddingBottom: 8,
			fontSize: 32,
			marginTop: 16,
			marginBottom: 24,
			color: colors.text1
		},
		hintBellowButton: {
			textAlign: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 8
		}
	});
