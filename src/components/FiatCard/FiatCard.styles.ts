import { StyleSheet } from 'react-native';

export const makeStyles = () =>
	StyleSheet.create({
		container: {
			width: '100%'
		},
		bottomRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: 4,
			marginBottom: 8
		}
	});
