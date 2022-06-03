import { StyleSheet } from 'react-native';
import { ColorType, fontType } from '@styles';

export const makeStyles = (isAmountValid: boolean, ghost: boolean, colors: ColorType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			...(!ghost && {
				borderBottomWidth: 2,
				borderBottomColor: isAmountValid ? colors.cta2 : colors.alert1
			})
		},
		input: {
			flex: 1,
			height: 54,
			fontFamily: 'Inter_400Regular',
			fontStyle: 'normal',
			fontWeight: 'normal',
			...(!ghost ? fontType.dMedium : fontType.dSmall),

			paddingBottom: 8
		}
	});
