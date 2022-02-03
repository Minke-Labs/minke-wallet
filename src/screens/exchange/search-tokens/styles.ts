import { StyleSheet, Dimensions } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		// SearchTokens
		header: {
			flexDirection: 'row',
			justifyContent: 'flex-end'
		},
		searchBar: {
			borderTopLeftRadius: 50,
			borderTopRightRadius: 50,
			borderRadius: 50,
			overflow: 'hidden',
			marginBottom: 24,
			height: 48,
			borderBottomWidth: 0,
			borderBottomColor: colors.fill,
			backgroundColor: colors.fill
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
			width: 50,
			height: 50,
			borderRadius: 100,
			marginRight: 16
		},
		tokenItemSymbol: {
			color: colors.placeholder,
			fontSize: 12,
			marginBottom: 4
		},
		tokenItemName: {
			color: colors.text,
			fontFamily: 'Inter_800ExtraBold',
			fontSize: 16
		},
		containerStyle: {
			backgroundColor: colors.background,
			bottom: 0,
			width: '100%',
			height: Dimensions.get('screen').height * 0.8
		}
	});
