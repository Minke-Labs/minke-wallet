import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './TransactionSelectFunds.styles';
import Card from './Card/Card';

interface UserProps {
	name: string;
	address: string;
}

const cardList = [
	{
		name: 'Ethereum',
		image: require('@assets/eth.png')
	},
	{
		name: 'DAI',
		image: require('@assets/dai.png')
	}
];

interface TransactionSelectFundsProps {
	user: UserProps;
	onSelected: (name: string) => void
}

const TransactionSelectFunds: React.FC<TransactionSelectFundsProps> = ({ user, onSelected }) => (
	<View style={styles.container}>
		<Image
			style={styles.image}
			source={require('@assets/wallet-created.png')}
		/>
		<Text style={styles.title}>
			Which{' '}
			<Text style={styles.titleHighlight}>asset</Text>
			{' '}do you want to send to <Text style={styles.titleHighlight}>{user.name}</Text>?
		</Text>
		{
			cardList.map((item) => (
				<Card
					key={item.name}
					name={item.name}
					image={item.image}
					{...{ user, onSelected }}
				/>
			))
		}
	</View>
);

export default TransactionSelectFunds;
