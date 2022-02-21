import { StyleSheet, Dimensions } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		// SearchTokens
		header: {
			flexDirection: 'row',
			justifyContent: 'flex-end'
		},
		searchSection: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 40,
			backgroundColor: colors.background2,
			borderRadius: 41
		},
		searchIcon: {
			marginLeft: 16,
			marginRight: 16,
			marginTop: 10,
			marginBottom: 10
		},
		searchBar: {
			flex: 1,
			paddingTop: 10,
			paddingRight: 10,
			paddingBottom: 10,
			paddingLeft: 0,
			fontFamily: 'Inter_400Regular',
			fontWeight: '400',
			fontSize: 16,
			color: colors.text1
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
			maxHeight: Dimensions.get('screen').height * 0.3
		}
	});
