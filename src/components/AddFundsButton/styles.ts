import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		cardDivisor: {
			width: '50%',
			flexDirection: 'row',
			alignItems: 'center',
			borderRightWidth: 1,
			flexGrow: 1,
			flexBasis: 0,
			justifyContent: 'center',
			borderRightColor: colors.background
		},
		modalContainerStyle: {
			backgroundColor: colors.background,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			padding: 24,
			width: '100%',
			position: 'absolute',
			bottom: 0
		},
		modalHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 8
		},
		modalHeadline: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold'
		},
		modalSubHeadline: {
			marginBottom: 24,
			fontSize: 18,
			fontFamily: 'Inter_500Medium'
		}
	});
