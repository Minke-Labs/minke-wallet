/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Card } from 'react-native-paper';
import { Text } from 'react-native';

const GasOption = ({
	title,
	icon,
	gweiValue,
	gweiPrice,
	wait
}: {
	title: string;
	icon: any;
	gweiValue: number;
	gweiPrice: number;
	wait: number;
}) => {
	const waiting = () => {
		if (wait < 1) {
			return `${60 * wait} sec`;
		}
		return `${wait} mins`;
	};
	return (
		<Card>
			<Card.Content>
				{icon}
				<Text>{title}</Text>
				<Text>
					{gweiValue / 10} gwei ~ {waiting()}
				</Text>
				<Text>${(gweiValue / 100) * gweiPrice * 200000}</Text>
			</Card.Content>
		</Card>
	);
};

export default GasOption;
