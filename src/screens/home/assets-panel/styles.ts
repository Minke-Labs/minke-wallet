import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors, scheme?: string | null) =>
	StyleSheet.create({
		paddingContent: {
			paddingTop: 24,
			paddingLeft: 24,
			paddingRight: 24,
			paddingBottom: 16
		},
		card: {
			borderRadius: 24,
			overflow: 'hidden',
			marginBottom: 16,
			borderStyle: 'solid',
			borderWidth: 1,
			borderColor: 'rgba(255, 255, 255, 0.1)'
		},
		cardTopContent: {
			padding: 24,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		cardLabel: {
			fontSize: 14,
			marginBottom: 8
		},
		cardBalance: {
			fontSize: 36
		},
		avatar: {
			width: 48,
			height: 48,
			borderColor: 'rgba(243, 247, 255, 1)',
			borderRadius: 50,
			borderWidth: 4
		},
		cardBottomContent: {
			borderTopWidth: 1,
			flexDirection: 'row',
			justifyContent: 'space-around',
			borderTopColor: colors.background,
			backgroundColor: scheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF'
		},
		cardDivisor: {
			width: '50%',
			flexDirection: 'row',
			alignItems: 'center',
			borderRightWidth: 1,
			flexGrow: 1,
			flexBasis: 0,
			justifyContent: 'center',
			borderRightColor: colors.background
		}
	});
