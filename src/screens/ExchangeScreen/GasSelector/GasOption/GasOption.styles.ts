import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			padding: 16,
			borderRadius: 16,
			marginRight: 8,
			backgroundColor: colors.background5
		},
		selectedCard: {
			borderWidth: 2,
			borderColor: colors.cta1
		},
		content: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		icon: {
			padding: 8,
			borderRadius: 50,
			marginLeft: 8,
			marginRight: 16,
			backgroundColor: colors.background3
		}
	});
