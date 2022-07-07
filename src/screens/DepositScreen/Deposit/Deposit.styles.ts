import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	depositButton: {
		paddingHorizontal: 24,
		marginTop: Platform.OS === 'android' ? undefined : 'auto',
		marginBottom: 16
	}
});
