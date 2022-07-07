import { Platform, StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5,
			borderRadius: 16,
			marginHorizontal: 16,
			marginBottom: 24,
			justifyContent: 'center',
			alignItems: 'center'
		},
		top: {
			borderBottomWidth: 1,
			borderBottomColor: colors.background1,
			paddingHorizontal: 16,
			paddingTop: 16,
			paddingBottom: 16 + 8,
			width: '100%'
		},
		bottom: {
			paddingHorizontal: 16,
			paddingBottom: 16,
			paddingTop: 16 + 8,
			width: '100%'
		},
		buttonBox: {
			marginHorizontal: 16,
			marginTop: Platform.OS === 'android' ? undefined : 'auto',
			marginBottom: 16
		}
	});
