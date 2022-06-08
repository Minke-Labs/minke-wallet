import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 24,
			alignItems: 'center'
		},
		random: {
			backgroundColor: colors.background5,
			alignItems: 'center',
			flexDirection: 'row',
			borderRadius: 64,
			paddingVertical: 12,
			paddingHorizontal: 16,
			width: '100%',
			justifyContent: 'space-between',
			marginBottom: 32
		},
		questionMark: {
			backgroundColor: colors.background3,
			borderRadius: 100,
			marginRight: 8
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		tokenRow: {
			marginBottom: 32,
			paddingHorizontal: 16,
			width: '100%',
			justifyContent: 'space-between'
		},
		tokenName: {
			marginLeft: 8
		}
	});
