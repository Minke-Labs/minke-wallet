import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			marginTop: 38,
			borderRadius: 24,
			marginBottom: 32,
			overflow: 'hidden'
		},
		glassContainer: {
			width: '100%',
			flexDirection: 'column',
			paddingTop: 16,
			alignItems: 'center',
			justifyContent: 'center',
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24
		},
		interestContainer: {
			alignItems: 'center',
			marginBottom: 16
		},
		infoRow: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 4
		},

		depositButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: '50%',
			paddingTop: 16,
			paddingRight: 32,
			paddingBottom: 16,
			paddingLeft: 32,
			backgroundColor: colors.detail4
		}
	});
