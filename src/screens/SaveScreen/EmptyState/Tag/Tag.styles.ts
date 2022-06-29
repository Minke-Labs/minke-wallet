import { StyleSheet } from 'react-native';
import { addColorOpacity } from '@helpers/utilities';

export default StyleSheet.create({
	tagGradient: {
		borderWidth: 4,
		borderRadius: 16,
		borderColor: addColorOpacity('#30C061', 0.3),
		marginBottom: 32
	},
	tagLinearGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 4
	},
	tagIcon: {
		marginRight: 8
	}
});
