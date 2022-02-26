import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		header: {
			height: 48,
			paddingHorizontal: 32,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		deposit: {
			paddingHorizontal: 24
		},
		depositHeadline: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		tokenCard: {
			borderRadius: 16,
			marginTop: 16,
			backgroundColor: colors.background2
		},

		depositButton: {
			paddingHorizontal: 24,
			marginTop: 'auto',
			marginBottom: 16
		}
	});
