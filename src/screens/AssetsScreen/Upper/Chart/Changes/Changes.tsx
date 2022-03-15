import React from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { View, ScrollView } from 'react-native';
import { Text } from '@components';
import styles from './Changes.styles';
import { ChangesProps } from './Changes.types';
import { Box } from './Box/Box';

const Changes: React.FC<ChangesProps> = ({ current, graphs }) => {
	const hour = useDerivedValue(() => graphs[0].data);
	const day = useDerivedValue(() => graphs[1].data);
	const week = useDerivedValue(() => graphs[2].data);
	const month = useDerivedValue(() => graphs[3].data);
	const year = useDerivedValue(() => graphs[4].data);
	const all = useDerivedValue(() => graphs[5].data);

	return (
		<View style={styles.container}>
			<Text weight="extraBold" marginBottom={16}>
				Changes
			</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Box data={hour} name="1 Hour" {...{ current, graphs }} />
				<Box data={day} name="1 Day" {...{ current, graphs }} />
				<Box data={week} name="1 Week" {...{ current, graphs }} />
				<Box data={month} name="1 Month" {...{ current, graphs }} />
				<Box data={year} name="1 Year" {...{ current, graphs }} />
				<Box data={all} name="All" {...{ current, graphs }} />
			</ScrollView>
		</View>
	);
};

export default Changes;
