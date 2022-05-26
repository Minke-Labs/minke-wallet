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
		exchangeSection: {
			paddingHorizontal: 24
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
		}
	});
