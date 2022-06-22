/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, Icon } from '@components';
import { StorytellerRowView, UIStyle } from '@getstoryteller/react-native-storyteller-sdk';

const Stories: React.FC<{ rowRef: any; }> = ({ rowRef }) => {
	const [toggle, setToggle] = useState(false);
	const scheme = useColorScheme();

	return (
		<View style={{ marginBottom: 64 }}>
			<TouchableOpacity
				onPress={() => setToggle(!toggle)}
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<Text
					weight="semiBold"
					type="p2" // TODO: Change to lMedium after merging the other branches
					style={{ marginRight: 8 }}
				>
					What’s new?
				</Text>
				<Icon
					name={toggle ? 'chevronUp' : 'chevronDown'}
					size={24}
					color="cta1"
				/>
			</TouchableOpacity>
			{toggle && (
				<View style={{ width: '100%', marginTop: 12 }}>
					<StorytellerRowView
						ref={(ref: any) => {
							if (ref) { rowRef = ref; }
						}}
						style={{
							height: 91,
							width: '100%'
						}}
						uiStyle={scheme === 'dark' ? 'dark' as UIStyle : 'light' as UIStyle}
					/>
				</View>
			)}
		</View>
	);
};

export default Stories;
