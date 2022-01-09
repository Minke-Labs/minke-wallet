import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 32,
		paddingRight: 32,
		justifyContent: 'space-evenly'
	},
	headerNavegation: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '4%'
	},
	headline: {
		fontWeight: '800',
		fontSize: 24,
		marginBottom: 16
	},
	subheading: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 32
	},
	backupWordContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	backupWordItem: {
		flexBasis: '50%',
		flexDirection: 'row',
		marginBottom: 16
	},
	backupWordNumberPadding: {
		backgroundColor: '#fff',
		width: 40,
		height: 40,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		borderColor: 'rgba(255, 255, 255, .2)',
		borderWidth: 0.5
	},
	backupWordNumber: {
		fontWeight: 'bold'
	},
	backupWordPadding: {
		paddingLeft: 12,
		justifyContent: 'center'
	},
	copyPasteButton: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 24,
		marginTop: '8%',
		borderRadius: 16
	},
	contentCopy: {
		marginRight: 8
	},
	snackbar: {
		width: '100%'
	}
});
