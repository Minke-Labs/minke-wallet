/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { Card, Text } from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const GasOption = ({
	type,
	gweiValue,
	gweiPrice,
	wait
}: {
	type: string;
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

	const Icon = useCallback(() => {
		switch (type) {
			case 'low':
				return <MaterialIcon name="turtle" color="#006AA6" size={20} />;
			case 'fast':
				return <EntypoIcon name="flash" color="#006AA6" size={20} />;
			case 'fastest':
				return <EntypoIcon name="flash" color="#006AA6" size={20} />;
			default:
				return <AntDesignIcon name="clockcircleo" color="#006AA6" size={20} />; // normal
		}
	}, []);
	return (
		<Card>
			<Card.Content>
				<Icon />
				<Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
				<Text>
					{gweiValue / 10} gwei ~ {waiting()}
				</Text>
				<Text>${(gweiValue / 100) * gweiPrice * 200000}</Text>
			</Card.Content>
		</Card>
	);
};

export default GasOption;
