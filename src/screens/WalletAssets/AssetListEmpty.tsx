import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from '@components';
import { whale3Img } from '@images';

interface AssetListEmptyProps {
	onPress: () => void;
}

const AssetListEmpty: React.FC<AssetListEmptyProps> = ({ onPress }) => (
	<View style={{
		flex: 1,
		alignItems: 'center',
		paddingTop: 92,
		paddingHorizontal: 24
	}}
	>
		<Image
			source={whale3Img}
			style={{
				width: 147,
				height: 137,
				marginBottom: 51
			}}
		/>
		<Text type="p2" marginBottom={15}>No tokens yet</Text>
		<Text weight="bold" type="p2" marginBottom={65}>Let&apos;s buy some?</Text>
		<Button title="Add funds to start" iconLeft="addStroke" onPress={onPress} />
	</View>
);

export default AssetListEmpty;
