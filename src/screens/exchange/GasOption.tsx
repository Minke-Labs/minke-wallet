/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

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
				return <MaterialIcon name="turtle" size={20} />;
			case 'fast':
				return <EntypoIcon name="flash" size={20} />;
			case 'fastest':
				return <EntypoIcon name="flash" size={20} />;
			default:
				return <AntDesignIcon name="clockcircleo" size={20} />; // normal
		}
	}, []);
	return (
		<Card style={styles.gasSelectorCard}>
			<Card.Content style={styles.gasSelectorCardContent}>
				<View style={styles.gasSelectorCardIcon}>
					<Icon />
				</View>
				<View style={styles.gasSelectorCardGasOption}>
					<Text style={styles.textBold}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
					<Text>
						{gweiValue / 10} gwei ~ {waiting()}
					</Text>
				</View>
				<View style={styles.alignRight}>
					<Text style={styles.textBold}>${((gweiValue / 100) * gweiPrice * 200000).toFixed(2)}</Text>
					<Text>Network Fee</Text>
				</View>
			</Card.Content>
		</Card>
	);
};

export default GasOption;
