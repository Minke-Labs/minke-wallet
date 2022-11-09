import { StyleSheet } from 'react-native';
import { ColorType, deviceHeight } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		// SearchTokens
		header: {
			flexDirection: 'row',
			justifyContent: 'flex-end'
		},
		tokenItem: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 24
		},
		tokenItemNameContainer: {
			flexDirection: 'column'
		},
		tokenItemImage: {
			width: 40,
			height: 40,
			borderRadius: 100,
			marginRight: 16
		},
		tokenItemSymbol: {
			color: colors.cta2,
			fontSize: 12,
			marginBottom: 4
		},
		tokenItemName: {
			color: colors.text1,
			fontFamily: 'Inter_800ExtraBold',
			fontSize: 16
		},
		list: {
			maxHeight: deviceHeight * 0.6,
			marginBottom: 24
		}
	});
