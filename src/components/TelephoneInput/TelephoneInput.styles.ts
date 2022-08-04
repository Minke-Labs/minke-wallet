import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType, height: number) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5,
			borderWidth: 1,
			borderRadius: 41,
			paddingHorizontal: 16,
			height,
			flexDirection: 'row',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center',
			flex: 1,
			zIndex: 999
		},

		label: {
			left: 62,
			alignSelf: 'center',
			position: 'absolute',
			flex: 1
		},

		input: {
			minHeight: height - 16,
			flex: 1,
			zIndex: 10,
			color: colors.text1,
			paddingBottom: 0,
			paddingLeft: 4,
			paddingTop: 18
		},

		toggleButton: {
			zIndex: 11,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
