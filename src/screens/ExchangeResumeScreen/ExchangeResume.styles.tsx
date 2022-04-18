import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
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
		exchangeResumeRateFixedContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: 16,
			paddingBottom: 16,
			borderTopWidth: 1,
			borderTopColor: colors.background1
		},
		exchangeResumeRateFixedLabel: {
			marginRight: 8,
			fontSize: 12
		},
		exchangeResumeRateFixed: {
			borderWidth: 1,
			borderRadius: 16,
			borderColor: colors.detail1,
			paddingLeft: 16,
			paddingRight: 16,
			paddingTop: 8,
			paddingBottom: 8,
			height: 16,
			width: 64,
			overflow: 'hidden',
			position: 'relative'
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
		},
		exchangeProgressBar: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: '#D0D0D0'
		},
		timerContainer: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
