import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
		backgroundColor: '#F2EAE1'
	},
	headline: {
		fontWeight: '800',
		fontSize: 24,
		color: '#213952',
		marginBottom: 16
	},
	subheading: {
		fontSize: 16,
		fontWeight: '500',
		color: '#213952'
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
	imageCopyPaste: {
		marginRight: 16
	}
});
