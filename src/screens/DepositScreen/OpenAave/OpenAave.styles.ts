import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	backgroundContainer: {
		height: 277
	},
	background: {
		position: 'absolute',
		width: '100%'
	},
	container: {
		position: 'relative',
		padding: 24,
		height: '100%',
		flex: 1,
		zIndex: 100
	},
	linearGradient: {
		height: '100%'
	},
	headerNavegation: {
		paddingTop: 16,
		flexDirection: 'row',
		marginBottom: 16
	},
	header: {
		marginBottom: 16
	},
	transparentCard: {
		backgroundColor: 'rgba(255, 255, 255, 0.12)'
	},
	whatsAave: {
		borderRadius: 16,
		padding: 24,
		marginBottom: 16
	},
	actionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16
	},
	actionOpenAave: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 16,
		alignItems: 'center'
	},
	actionTextButton: {
		paddingTop: 0,
		paddingRight: 4,
		paddingBottom: 0,
		paddingLeft: 4
	},
	aaveGhost: {
		width: 344,
		height: 499,
		position: 'absolute',
		bottom: -56,
		right: -56
	}
});
