import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		// ... BACKGROUND
		background: {
			position: 'absolute',
			height: '100%',
			width: '115%'
		},
		// ... SAVESCREEEN
		container: {
			flex: 1,
			backgroundColor: colors.detail4
		}
	});
