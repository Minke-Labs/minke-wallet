import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

const HEIGHT = 56;
const HEIGHT_SMALL = 40;

export const makeStyles = (colors: ColorType, small: boolean) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5,
			borderWidth: 1,
			borderRadius: 41,
			paddingHorizontal: 24,
			paddingVertical: 10,
			alignContent: 'center',
			justifyContent: 'center',
			height: small ? HEIGHT_SMALL : HEIGHT,
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
			...(!small && { minHeight: HEIGHT - 16 }),
			flex: 1,
			zIndex: 10,
			color: colors.text1,
			paddingBottom: 0,
			paddingTop: small ? 0 : HEIGHT_SMALL / 2 - 8
		},

		toggleButton: {
			zIndex: 11,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
