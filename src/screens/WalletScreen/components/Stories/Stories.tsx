import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, Icon } from '@components';
import { useLanguage, useWalletState } from '@hooks';
import { STORYTELLER_KEY } from '@env';
import Storyteller,
{
	StorytellerRowView,
	UIStyle,
	Theme,
	ElementAlignment,
	TextCase
} from '@getstoryteller/react-native-storyteller-sdk';

const storytellerTheme: Theme = {
	light: {
		colors: {
			primary: '#F2EAE1',
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
	}
};

const Stories: React.FC = () => {
	const { state } = useWalletState();
	const { i18n } = useLanguage();
	const { address: walletAddress } = state.value;
	const [toggle, setToggle] = useState(false);
	const scheme = useColorScheme();
	const rowRef = useRef<StorytellerRowView>(null);

	const reloadDataIfNeeded = () => {
		if (rowRef.current) rowRef.current.reloadData();
	};

	const initializeStoryteller = () => {
		Storyteller.initialize(
			(STORYTELLER_KEY || process.env.STORYTELLER_KEY)!,
			walletAddress,
			'',
			[],
			(callback: { result: Boolean, message: string }) => {
				console.log(`\n\n\nresult: ${callback.result}. Message: ${callback.message}`);
				reloadDataIfNeeded();
			}
		);
	};

	useEffect(() => {
		initializeStoryteller();
	}, []);

	return (
		<View style={{ marginBottom: 64 }}>
			<TouchableOpacity
				onPress={() => setToggle(!toggle)}
				style={{ flexDirection: 'row', alignItems: 'center' }}
			>
				<Text
					weight="semiBold"
					type="p2" // TODO: Change to lMedium after merging the other branches
					style={{ marginRight: 8 }}
				>
					{i18n.t('WalletScreen.components.Stories.whats_new')}
				</Text>
				<Icon
					name={toggle ? 'chevronUp' : 'chevronDown'}
					size={24}
					color="cta1"
				/>
			</TouchableOpacity>
			<View style={{ width: '100%', marginTop: 12, display: toggle ? 'flex' : 'none' }}>
				<StorytellerRowView
					cellType="round"
					theme={storytellerTheme}
					ref={rowRef}
					style={{ height: 91 }}
					uiStyle={scheme === 'dark' ? 'dark' as UIStyle : 'light' as UIStyle}
					onDataLoadStarted={() => console.log('STORIES LOADING...')}
					onDataLoadCompleted={() => console.log('STORIES FULLY LOADED.')}
				/>
			</View>
		</View>
	);
};

export default Stories;
