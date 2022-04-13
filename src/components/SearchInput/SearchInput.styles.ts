import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colors.background2,
			borderRadius: 41,
			maxHeight: 40
		},
		icon: {
			marginLeft: 16,
			marginRight: 16,
			marginTop: 10,
			marginBottom: 10
		},
		input: {
			flex: 1,
			paddingTop: 10,
			paddingRight: 10,
			paddingBottom: 10,
			paddingLeft: 0,
			fontFamily: 'Inter_400Regular',
			fontWeight: '400',
			fontSize: 16,
			color: colors.text1
		}
	});
