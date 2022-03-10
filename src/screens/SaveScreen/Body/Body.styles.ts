import { StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		depositCardContainer: {
			flex: 1,
			backgroundColor: colors.background1,
			paddingVertical: 32,
			paddingHorizontal: 24,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24
		},
		actionDepositCard: {
			borderRadius: 16,
			backgroundColor: colors.detail4,
			padding: 24,
			marginBottom: 32,
			justifyContent: 'center'
		}
	});
