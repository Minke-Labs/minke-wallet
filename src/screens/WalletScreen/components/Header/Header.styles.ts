import { ColorType } from '@styles';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			marginBottom: 24
		},
		leftContainer: {
			flexDirection: 'row',
			alignItems: 'flex-end'
		},
		iconsContainer: {
			flexDirection: 'row',
			alignItems: 'center'
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
