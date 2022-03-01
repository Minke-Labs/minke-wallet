import { Dimensions, StyleSheet } from 'react-native';
import { ColorType } from '@styles';
import { addColorOpacity } from '@helpers/utilities';

export const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		container: {
			height: '100%',
			backgroundColor: colors.background2
		},
		bgSaveEmptyScreen: {
			width: '100%',
			height: Dimensions.get('screen').height * 0.6,
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: -1
		},
		// ... HEADER
		headerNavigation: {
			paddingLeft: 24
		},
		headerNavigationLeft: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		headerNavigationTitle: {
			marginLeft: 8
		},
		// .... CONTENT
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
		linearGradientContainer: {
			borderWidth: 4,
			borderRadius: 8,
			borderColor: addColorOpacity('#30C061', 0.3)
		},
		linearGradient: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 4,
			paddingHorizontal: 14,
			paddingVertical: 4
		},
		greenButtonIcon: {
			marginRight: 8
		}
	});
