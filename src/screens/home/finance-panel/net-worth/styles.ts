import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors, scheme?: string | null) =>
	StyleSheet.create({
		tabsNetWorth: {
			paddingTop: 24,
			paddingLeft: 24,
			paddingRight: 24,
			paddingBottom: 80,
			backgroundColor: colors.fill,
			borderTopLeftRadius: 24,
			marginTop: 0,
			height: '100%'
		},
		netWorthItem: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 32
		},
		netWorthIcon: {
			padding: 16,
			borderRadius: 16,
			borderColor: 'rgba(255, 255, 255, 0.1)',
			borderStyle: 'solid',
			borderWidth: 1,
			backgroundColor: scheme === 'dark' ? undefined : 'rgba(103, 152, 242, 0.1)'
		},
		netWorthIconAlert: {
			padding: 16,
			borderRadius: 16,
			backgroundColor: scheme === 'dark' ? undefined : 'rgba(192, 48, 48, 0.1)',
			borderColor: 'rgba(225, 138, 138, 0.4)',
			borderStyle: 'solid',
			borderWidth: 1
		},
		netWorthIconColor: {
			color: scheme === 'dark' ? '#F5D6D6' : '#5E2522'
		},
		netWorthItemText: {
			flex: 1,
			marginLeft: 16
		},
		currentValueCard: {
			paddingTop: 16,
			paddingLeft: 24,
			paddingRight: 24,
			paddingBottom: 16,
			borderRadius: 24,
			marginBottom: 40,
			marginTop: 16,
			borderStyle: 'solid',
			borderWidth: 1,
			borderColor: 'rgba(255, 255, 255, 0.1)',
			display: 'none'
		},
		cardLabel: {
			fontSize: 14,
			marginBottom: 8
		},
		cardBalance: {
			fontSize: 36
		},
		secondaryText: {
			color: colors.secondaryText,
			fontSize: 12
		},
		arrowPadding: {
			paddingLeft: 4,
			marginTop: 2
		}
	});
