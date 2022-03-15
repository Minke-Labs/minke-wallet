/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Animated from 'react-native-reanimated';
import { View, ScrollView } from 'react-native';
import { Text, PercChange } from '@components';
import styles from './Changes.styles';

const Box = () => (
	<View style={styles.box}>
		<Text marginBottom={8}>1 Day</Text>
		<Text>0.24%</Text>
	</View>
);

type GraphIndex = 0 | 1 | 2 | 3 | 4 | 5;
interface ChangesProps {
	percChange: number;
	graphs: any;
	current: Animated.SharedValue<GraphIndex>;
}

const Changes: React.FC<ChangesProps> = ({ current, graphs, percChange }) => (
	<View style={styles.container}>
		<Text weight="extraBold" marginBottom={16}>
			Changes
		</Text>
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{/* <PercChange {...{ current, graphs, percChange }} /> */}
			<Box />
		</ScrollView>
	</View>
);

export default Changes;
