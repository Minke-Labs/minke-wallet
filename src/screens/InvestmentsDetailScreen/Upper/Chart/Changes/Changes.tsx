import React from 'react';
import { View, Text, Scroll } from '@components';
import { useLanguage } from '@hooks';
import { ChangesProps } from './Changes.types';
import { Box } from './Box/Box';
import { useChanges } from './Changes.hooks';

const Changes: React.FC<ChangesProps> = ({ current, graphs }) => {
	const { i18n } = useLanguage();
	const { hour, day, week, month, year, all } = useChanges(graphs);
	return (
		<View pl="xs" pb="m">
			<Text type="tMedium" weight="bold" mb="xs">
				{i18n.t('AssetsScreen.Upper.Chart.Changes.changes')}
			</Text>

			<Scroll horizontal hideIndicator>
				<Box
					data={hour}
					name={i18n.t('AssetsScreen.Upper.Chart.Changes.hour')}
					{...{ current, graphs }}
				/>
				<Box
					data={day}
					name={i18n.t('AssetsScreen.Upper.Chart.Changes.day')}
					{...{ current, graphs }}
				/>
				<Box
					data={week}
					name={i18n.t('AssetsScreen.Upper.Chart.Changes.week')}
					{...{ current, graphs }}
				/>
				<Box
					data={month}
					name={i18n.t('AssetsScreen.Upper.Chart.Changes.month')}
					{...{ current, graphs }}
				/>
				<Box
					data={year}
					name={i18n.t('AssetsScreen.Upper.Chart.Changes.year')}
					{...{ current, graphs }}
				/>
				<Box
					data={all}
					name={i18n.t('AssetsScreen.Upper.Chart.Changes.all')}
					{...{ current, graphs }}
				/>
			</Scroll>

		</View>
	);
};

export default Changes;
