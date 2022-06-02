import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5,
			borderRadius: 16,
			marginHorizontal: 16,
			marginBottom: 24
		},
		top: {
			borderBottomWidth: 1,
			borderBottomColor: colors.background1,
			paddingHorizontal: 16,
			paddingTop: 16,
			paddingBottom: 16 + 8
		},
		bottom: {
			paddingHorizontal: 16,
			paddingBottom: 16,
			paddingTop: 16 + 8
		},
		buttonBox: {
			marginHorizontal: 16,
			marginTop: 'auto',
			marginBottom: 16
		},

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
