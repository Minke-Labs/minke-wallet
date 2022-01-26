import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors, scheme?: string | null) =>
	StyleSheet.create({
		settingsOptions: {
			marginTop: 24,
			height: '100%'
		},
		settingsItem: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 32
		},
		settingsIcon: {
			padding: 16,
			borderRadius: 16,
			borderColor: 'rgba(255, 255, 255, 0.1)',
			borderStyle: 'solid',
			borderWidth: 1,
			backgroundColor: scheme === 'dark' ? undefined : '#FFFFFF'
		},
		settingsItemText: {
			flex: 1,
			marginLeft: 16
		},
		label: {
			fontSize: 18,
			fontFamily: 'Inter_700Bold'
		},
		rightIcon: {
			fontSize: 14,
			marginBottom: 8,
			paddingLeft: 4,
			marginTop: 2
		}
	});
