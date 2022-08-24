import React from 'react';
import { Text, Paper } from '@components';

export interface AboutProps {
	title: string;
	desc: string;
}

const About: React.FC<Partial<AboutProps>> = ({ title, desc }) => {
	if (!desc) return null;
	return (
		<Paper p="s">
			<Text type="tMedium" weight="bold" mb="xxs">
				{title}
			</Text>
			<Text type="bSmall" color="text3">
				{desc.replace('<[^>]*>', '')}
			</Text>
		</Paper>
	);
};

export default About;
