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
		// ... HEADER
		headerNavigation: {
			marginTop: 12,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		headerNavigationLeft: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		// ... SAVESCREEEN
		container: {
			flex: 1,
			backgroundColor: colors.detail4
		},
		saveCurrentValueContainer: {
			marginTop: 38,
			borderRadius: 24,
			marginBottom: 32,
			overflow: 'hidden'
		},
		saveCurrentValue: {
			width: '100%',
			flexDirection: 'column',
			paddingTop: 16,
			alignItems: 'center',
			justifyContent: 'center',
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24
		},
		depositButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			paddingTop: 16,
			paddingRight: 32,
			paddingBottom: 16,
			paddingLeft: 32,
			backgroundColor: colors.detail4
		},
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
			marginBottom: 32
		}
	});
