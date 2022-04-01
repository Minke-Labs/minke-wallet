import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		tokenCardWrap: {
			padding: 16,
			width: '100%'
		},
		tokenCard: {
			borderRadius: 16,
			marginTop: 16,
			backgroundColor: colors.background2
		},
		tokenCardCoinContent: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			width: '100%'
		},
		tokenCardCoin: {
			flexWrap: 'wrap',
			flexDirection: 'row',
			alignItems: 'center'
		},
		tokenImageContainer: {
			borderRadius: 50,
			borderWidth: 2,
			borderColor: 'rgba(98, 126, 234, 0.2)'
		},
		tokenImage: {
			borderRadius: 100,
			width: 40,
			height: 40
		},
		tokenName: {
			paddingLeft: 8
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
		tokenCardMaxButtonContent: {
			alignItems: 'flex-end',
			marginTop: 8
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
