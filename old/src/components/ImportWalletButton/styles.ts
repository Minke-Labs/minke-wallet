import { StyleSheet } from 'react-native';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		inputContainer: {
			borderRadius: 24,
			height: 102,
			overflow: 'hidden',
			borderColor: colors.primary,
			borderWidth: 1,
			marginTop: 24,
			marginBottom: 24
		},
		textarea: {
			borderRadius: 24,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			height: 104,
			overflow: 'hidden',
			backgroundColor: colors.fill
		}
	});
