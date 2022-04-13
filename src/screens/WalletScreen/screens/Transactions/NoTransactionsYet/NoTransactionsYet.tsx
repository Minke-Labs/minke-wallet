import React from 'react';
import { whale2Img } from '@images';
import { Text, Button } from '@components';
import { View, Image } from 'react-native';
import styles from './NoTransactionsYet.styles';
import { NoTransactionsYetProps } from './NoTransactionsYet.types';

export const NoTransactionsYet: React.FC<NoTransactionsYetProps> = ({ onAddFunds }) => (
	<View style={styles.container}>
		<Image source={whale2Img} style={styles.image} />
		<Text color="text4" weight="medium" marginBottom={16}>
			No transactions here
		</Text>
		<Text color="text3" weight="bold" marginBottom={64}>
			Let&apos;s get started?
		</Text>
		<Button onPress={onAddFunds} iconLeft="addStroke" title="Add funds to start" marginBottom={14} />
	</View>
);
