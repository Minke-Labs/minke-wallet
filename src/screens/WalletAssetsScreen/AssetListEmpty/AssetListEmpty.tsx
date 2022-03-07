import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from '@components';
import { whale3Img } from '@images';
import { AssetListEmptyProps } from './AssetListEmpty.types';
import styles from './AssetListEmpty.styles';

const AssetListEmpty: React.FC<AssetListEmptyProps> = ({ onPress }) => (
	<View style={styles.container}>
		<Image source={whale3Img} style={styles.image} />
		<Text type="p2" marginBottom={15}>
			No tokens yet
		</Text>
		<Text weight="bold" type="p2" marginBottom={65}>
			Let&apos;s buy some?
		</Text>
		<Button title="Add funds to start" iconLeft="addStroke" onPress={onPress} />
	</View>
);

export default AssetListEmpty;
