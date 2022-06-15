import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.background5
		},
		imgContainer: {
			position: 'absolute',
			top: -70,
			width: '100%'
		},
		content: {
			width: '100%',
			minHeight: '40%',
			height: '100%',
			paddingBottom: 24,
			paddingVertical: 32,
			alignItems: 'center'
		}
	});
