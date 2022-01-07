/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Card as PaperCard, Text, useTheme } from 'react-native-paper';

export const Card = (props: any) => {
	const properties = { ...props };
	properties.style = {
		...{ borderColor: 'rgba(255, 255, 255, 0.1)', borderStyle: 'solid', borderWidth: 1 },
		...properties.style
	};
	return <PaperCard {...properties} />;
};

export const SecondaryText = (props: any) => {
	const { colors } = useTheme();
	const properties = { ...props };
	properties.style = { ...properties.style, ...{ color: colors.secondaryText } };
	return <Text {...properties} />;
};
