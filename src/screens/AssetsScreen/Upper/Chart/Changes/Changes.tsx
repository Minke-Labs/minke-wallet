import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@components';
import styles from './Changes.styles';
import { ChangesProps } from './Changes.types';
import { Box } from './Box/Box';
import { useChanges } from './Changes.hooks';

const Changes: React.FC<ChangesProps> = ({ current, graphs }) => {
	const { hour, day, week, month, year, all } = useChanges(graphs);
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
