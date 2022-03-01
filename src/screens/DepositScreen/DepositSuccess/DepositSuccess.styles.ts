import { Dimensions, StyleSheet } from 'react-native';
import { ColorType } from '@styles';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			height: '100%',
			backgroundColor: colors.background2
		},
		saveEmptyStateContent: {
			flex: 1,
			alignItems: 'flex-end',
			flexDirection: 'row'
		},
		saveEmptyStateCard: {
			width: '100%',
			height: Dimensions.get('screen').height * 0.5,
			alignItems: 'center',
			paddingHorizontal: 24,
			paddingTop: '10%',
			borderTopRightRadius: 88,
			backgroundColor: colors.text6
		},
		textCenter: {
			textAlign: 'center'
		},
		bgSaveEmptyScreen: {
			width: '100%',
			height: Dimensions.get('screen').height * 0.6,
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1
		},
		greenButton: {
			marginBottom: 56,
			borderColor: 'rgba(222, 245, 236, 1)',
			borderRadius: 12.5,
			borderWidth: 4
		},
		greenButtonText: {
			fontSize: 14
		},
		greenButtonIcon: {
			marginBottom: -8,
			marginRight: 8
		},
		linearGradient: {
			flexDirection: 'row',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 8,
			paddingVertical: 8,
			paddingHorizontal: 24
		}
	});