import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 32
	},
	headerNavegation: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24,
		marginBottom: 16
	},
	headline: {
		fontWeight: '800',
		fontSize: 24,
		marginBottom: 16
	},
	subheading: {
		fontSize: 16,
		fontWeight: '500'
	},
	backupWordContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 40
	},
	backupWordItem: {
		flexBasis: '50%',
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
		flex: 1,
		justifyContent: 'center'
	},
	copyPasteButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 24,
		borderRadius: 16
	},
	contentCopy: {
		marginRight: 8
	},
	snackbar: {
		width: '100%'
	}
});
