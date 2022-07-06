import { ColorType } from '@styles';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		headerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 24
		},
		iconsContainer: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		leftContainer: {
			flexDirection: 'row',
			alignItems: 'flex-end'
		},
		icon: {
			marginLeft: 12,
			marginBottom: 3
		},
		minkePoints: {
			borderRadius: 8,
			backgroundColor: colors.background3,
			paddingHorizontal: 12,
			paddingVertical: 1,
			marginRight: 8
		}
	});
