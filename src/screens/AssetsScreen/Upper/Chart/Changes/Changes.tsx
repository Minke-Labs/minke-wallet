import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@components';
import { useLanguage } from '@hooks';
import { ChangesProps } from './Changes.types';
import { Box } from './Box/Box';
import { useChanges } from './Changes.hooks';
import styles from './Changes.styles';

const Changes: React.FC<ChangesProps> = ({ current, graphs }) => {
	const { i18n } = useLanguage();
	const { hour, day, week, month, year, all } = useChanges(graphs);
	return (
		<View style={styles.container}>
			<Text weight="extraBold" marginBottom={16}>
				{i18n.t('AssetsScreen.Changes.changes')}
			</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Box data={hour} name={i18n.t('AssetsScreen.Changes.hour')} {...{ current, graphs }} />
				<Box data={day} name={i18n.t('AssetsScreen.Changes.day')} {...{ current, graphs }} />
				<Box data={week} name={i18n.t('AssetsScreen.Changes.week')} {...{ current, graphs }} />
				<Box data={month} name={i18n.t('AssetsScreen.Changes.month')} {...{ current, graphs }} />
				<Box data={year} name={i18n.t('AssetsScreen.Changes.year')} {...{ current, graphs }} />
				<Box data={all} name={i18n.t('AssetsScreen.Changes.all')} {...{ current, graphs }} />
			</ScrollView>
		</View>
	);
};

export default Changes;
