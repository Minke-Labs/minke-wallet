import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		header: {
			height: 48,
			paddingHorizontal: 32,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		textBold: {
			fontFamily: 'Inter_800ExtraBold'
		},
		alignRight: {
			alignItems: 'flex-end'
		},
		exchangeSection: {
			paddingLeft: 24,
			paddingRight: 24
		},
		exchangeButton: {
			marginTop: 'auto',
			marginBottom: 16
		},
		exchangeHeadlineRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		exchangeSummaryText: {
			marginTop: 8,
			fontSize: 12,
			color: colors.cta2
		},

		// Gas Option
		scrollviewHorizontal: {
			marginTop: 24,
			marginBottom: 24,
			paddingLeft: 0
		},
		scrollviewHorizontalContent: {
			flexDirection: 'row',
			paddingLeft: 24,
			paddingRight: 32
		},
		gasSelectorCard: {
			borderRadius: 16,
			marginRight: 16,
			backgroundColor: colors.background2
		},
		selectedCard: {
			borderWidth: 2,
			borderColor: colors.cta1
		},
		gasSelectorCardContent: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: 8
		},
		gasSelectorCardIcon: {
			padding: 8,
			borderRadius: 50,
			marginRight: 16,
			backgroundColor: colors.background4
		},
		gasSelectorCardGasOption: {
			marginRight: 16
		}
	});
