import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		// ExchangeResume
		exchangeContainer: {
			flex: 1,
			paddingLeft: 24,
			paddingRight: 24,
			flexDirection: 'column'
		},
		exchangeResumeDivisor: {
			justifyContent: 'center',
			alignItems: 'center',
			borderRightWidth: 1,
			borderColor: colors.background,
			marginTop: 24,
			marginBottom: 24
		},
		exchangeResumeContainer: {
			paddingTop: 0
		},
		exchangeResumeCard: {
			marginBottom: 16,
			flexDirection: 'column',
			borderRadius: 16,
			backgroundColor: colors.fill
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
			backgroundColor: colors.fill
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
		exchangeResumeRateFixedContiner: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: 16,
			paddingBottom: 16,
			borderTopWidth: 1,
			borderTopColor: colors.background
		},
		exchangeResumeRateFixedLabel: {
			marginRight: 8,
			fontSize: 12
		},
		exchangeResumeRateFixed: {
			borderWidth: 1,
			borderRadius: 16,
			borderColor: colors.background,
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
			marginTop: 24,
			backgroundColor: colors.fill
		},
		tokenCardDivisor: {
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomWidth: 1,
			borderColor: colors.background,
			marginTop: 24,
			marginBottom: 24
		},
		tokenCardDivisorBackground: {
			borderRadius: 50,
			padding: 8,
			backgroundColor: colors.background,
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
