import { Theme, ElementAlignment, TextCase } from '@getstoryteller/react-native-storyteller-sdk';

export const storytellerTheme: Theme = {
	light: {
		colors: {
			primary: '#F4F6F8',
			success: '#30C061',
			alert: '#C03030',
			white: {
				primary: '#FFFFFF'
			},
			black: {
				primary: '#000000'
			}
		},
		customFont: {
			ios: {
				regular: 'Comic Sans MS',
				medium: 'Comic Sans MS',
				semibold: 'Comic Sans MS Bold',
				bold: 'Comic Sans MS Bold',
				heavy: 'Comic Sans MS Bold',
				black: 'Comic Sans MS Bold'
			},
			android: {
				font: 'Comic Sans MS'
			}
		},
		primitives: {
			cornerRadius: 10
		},
		lists: {
			row: {
				tileSpacing: 12,
				startInset: 0,
				endInset: 0
			},
			grid: {
				tileSpacing: 12,
				columns: 0,
				topInset: 0,
				bottomInset: 0
			},
			home: {
				startInset: 0,
				endInset: 0
			}
		},
		storyTiles: {
			title: {
				textSize: 12,
				lineHeight: 16.8,
				alignment: ElementAlignment.center
			},
			circularTile: {
				readIndicatorColor: '#000000',
				title: {}
			},
			rectangularTile: {
				padding: 4,
				title: {
					textColor: '#000000'
				},
				unreadIndicator: {
					alignment: ElementAlignment.right,
					textSize: 12,
					backgroundColor: '#30C061'
				}
			}
		},
		player: {
			icons: {
				share: false,
				refresh: false
			},
			showStoryIcon: false,
			showTimestamp: false,
			showShareButton: false
		},
		buttons: {
			textCase: TextCase.default
		},
		instructions: {
			show: false,
			button: {}
		},
		engagementUnits: {
			poll: {
				percentBarColor: '#FABA18',
				showVoteCount: false,
				showPercentBarBackground: false
			},
			triviaQuiz: {}
		}
	},

	dark: {
		colors: {
			primary: '#0A2138',
			success: '#ACE8B9',
			alert: '#E18A8A',
			white: {
				primary: '#FFFFFF'
			},
			black: {
				primary: '#000000'
			}
		},
		customFont: {
			ios: {
				regular: 'Comic Sans MS',
				medium: 'Comic Sans MS',
				semibold: 'Comic Sans MS Bold',
				bold: 'Comic Sans MS Bold',
				heavy: 'Comic Sans MS Bold',
				black: 'Comic Sans MS Bold'
			},
			android: {
				font: 'Comic Sans MS'
			}
		},
		primitives: {
			cornerRadius: 10
		},
		lists: {
			row: {
				tileSpacing: 12,
				startInset: 0,
				endInset: 0
			},
			grid: {
				tileSpacing: 12,
				columns: 0,
				topInset: 0,
				bottomInset: 0
			},
			home: {
				startInset: 0,
				endInset: 0
			}
		},
		storyTiles: {
			title: {
				textSize: 12,
				lineHeight: 16.8,
				alignment: ElementAlignment.center
			},
			circularTile: {
				readIndicatorColor: '#FFFFFF',
				title: {}
			},
			rectangularTile: {
				padding: 4,
				title: {
					textColor: '#FFFFFF'
				},
				unreadIndicator: {
					alignment: ElementAlignment.right,
					textSize: 12,
					backgroundColor: '#ACE8B9'
				}
			}
		},
		player: {
			icons: {
				share: false,
				refresh: false
			},
			showStoryIcon: false,
			showTimestamp: false,
			showShareButton: false
		},
		buttons: {
			textCase: TextCase.default
		},
		instructions: {
			show: false,
			button: {}
		},
		engagementUnits: {
			poll: {
				percentBarColor: '#FABA18',
				showVoteCount: false,
				showPercentBarBackground: false
			},
			triviaQuiz: {}
		}
	}
};
