import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';
import { whale3Img } from '@images';
import styles from './styles';

export const NoContactsYet = () => (
	<View style={styles.container}>
		<Image source={whale3Img} style={styles.image} />
		<Text type="p2" marginBottom={15}>
			No contacts yet
		</Text>
		<Text weight="bold" type="p2" marginBottom={65}>
			Add some to start
		</Text>
	</View>
);
