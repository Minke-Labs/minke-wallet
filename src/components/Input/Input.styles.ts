import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5,
			borderColor: colors.detail2,
			borderWidth: 1,
			borderRadius: 41,
			paddingHorizontal: 11,
			paddingTop: 10,
			paddingBottom: 10,
			alignContent: 'center',
			justifyContent: 'center',
			height: 56,
			alignItems: 'center',
			flexDirection: 'row',
			flex: 1
		},

		input: {
			minHeight: 28,
			color: '#000',
			paddingVertical: 0,
			flex: 1,
			zIndex: 10,

			borderWidth: 1,
			borderColor: 'red'
		},

		toggleButton: {
			zIndex: 11,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
