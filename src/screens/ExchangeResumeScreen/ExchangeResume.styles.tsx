import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			borderBottomWidth: 1,
			borderBottomColor: colors.background1,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		},
		containerLeft: {
			flex: 1,
			height: '100%',
			borderRightWidth: 1,
			borderRightColor: colors.background1,
			paddingTop: 28,
			paddingBottom: 14,
			alignItems: 'center'
		},
		containerRight: {
			flex: 1,
			paddingTop: 28,
			paddingBottom: 14,
			alignItems: 'center'
		},
		containerBottom: {
			paddingVertical: 12,
			flexDirection: 'row',
			justifyContent: 'center'
		},

		infoTop: {
			marginBottom: 16,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		infoBottom: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},

		// ExchangeResume
		exchangeContainer: {
			flex: 1,
			paddingLeft: 24,
			paddingRight: 24,
			flexDirection: 'column'
		},

		exchangeResumeContainer: {
			paddingLeft: 24,
			paddingRight: 24,
			marginTop: 8,
			flex: 1
		},
		exchangeResume: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginTop: 24,
			marginBottom: 24
		},
		summaryCard: {
			borderRadius: 16,
			marginTop: 16,
			marginBottom: 16,
			backgroundColor: colors.background2
		},
		summaryRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between'
		},
		marginBottom: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 16
		},
		tokenDetail: {
			width: '50%',
			padding: 16
		},

		exchangeResumeRateFixedLabel: {
			marginRight: 8,
			fontSize: 12
		},
		exchangeResumeRateFixedContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: 16,
			paddingBottom: 16,
			borderTopWidth: 1,
			borderTopColor: colors.background1
		},

		tokenCard: {
			borderRadius: 16,
			marginTop: 16,
			backgroundColor: colors.background2
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
		}
	});
