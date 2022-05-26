import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			padding: 16,
			width: '100%',
			borderRadius: 16,
			backgroundColor: colors.background5
		},

		coinSelector: {
			flexDirection: 'row',
			width: '100%',
			marginBottom: 16
		},
		coinSelectorTitles: {
			justifyContent: 'space-between',
			marginLeft: 16
		},

		coinSelectorTitlesUpper: {
			flexDirection: 'row'
		},

		bottomRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between'
		},

		tokenImage: {
			borderRadius: 100,
			width: 40,
			height: 40
		},

		tokenCardDivisor: {
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: colors.background1,
			marginTop: 24,
			marginBottom: 24
		},
		tokenCardDivisorBackground: {
			borderRadius: 50,
			padding: 8,
			backgroundColor: colors.background1,
			position: 'absolute'
		},
		tokenCardDivisorImage: {
			width: 24,
			height: 24
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		tokenCardMaxButton: {
			flexDirection: 'row'
		},

		tokenCardMaxButtonText: {
			paddingLeft: 4
		},
		selectTokenRow: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingRight: 16
		},
		currencyIcon: {
			padding: 8,
			marginRight: 8
		}
	});
