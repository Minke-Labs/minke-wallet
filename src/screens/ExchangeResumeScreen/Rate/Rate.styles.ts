import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderRadius: 8,
			borderColor: colors.background3,
			paddingHorizontal: 12,
			height: 16,
			width: 60,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center'
		},
		progressBar: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: colors.background3
		},
		timer: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
