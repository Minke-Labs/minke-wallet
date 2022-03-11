import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

const HEIGHT = 56;

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5,
			borderWidth: 1,
			borderRadius: 41,
			paddingHorizontal: 24,
			paddingVertical: 10,
			alignContent: 'center',
			justifyContent: 'center',
			height: HEIGHT,
			alignItems: 'center',
			flexDirection: 'row',
			flex: 1,
			zIndex: 999
		},

		label: {
			left: 5,
			alignSelf: 'center',
			position: 'absolute',
			flex: 1
		},

		input: {
			minHeight: HEIGHT - 16,
			flex: 1,
			zIndex: 10,
			color: colors.text1,
			paddingBottom: 0,
			paddingTop: HEIGHT / 2 - 8
		},

		toggleButton: {
			zIndex: 11,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
