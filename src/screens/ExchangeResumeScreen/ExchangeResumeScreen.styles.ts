import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			borderBottomWidth: 1,
			borderBottomColor: colors.background1,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		},
		containerLeft: {
			flex: 1,
			height: '100%',
			borderRightWidth: 1,
			borderRightColor: colors.background1,
			paddingTop: 28,
			paddingBottom: 14,
			alignItems: 'center'
		},
		containerRight: {
			flex: 1,
			paddingTop: 28,
			paddingBottom: 14,
			alignItems: 'center'
		},
		containerBottom: {
			paddingVertical: 12,
			flexDirection: 'row',
			justifyContent: 'center'
		},
		infoTop: {
			marginBottom: 16,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		infoBottom: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		haptic: {
			marginTop: 'auto',
			marginBottom: 32,
			marginHorizontal: 16
		}
	});
