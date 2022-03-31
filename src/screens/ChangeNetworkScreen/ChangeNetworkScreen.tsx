import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { networks } from '@models/network';
import { BasicLayout } from '@layouts';
import { Icon, Text } from '@components';
import ListItem from './ListItem/ListItem';
import styles from './ChangeNetworkScreen.styles';
import { useChangeNetworkScreen } from './ChangeNetworkScreen.hooks';

const ChangeNetworkScreen = () => {
	const { connectedNetwork, selectNetwork, goBack } = useChangeNetworkScreen();

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={goBack}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={goBack}>
					<Text weight="medium" color="text7" type="a">
						Done
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.padding}>
				<Text weight="extraBold" type="h3" marginBottom={28}>
					Network
				</Text>

				<FlatList
					data={Object.values(networks)}
					renderItem={({ item }) => (
						<ListItem
							label={item.name}
							onPress={() => selectNetwork(item)}
							selected={item.id === connectedNetwork?.id}
							token={item.nativeToken.symbol}
							testnet={item.testnet}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</BasicLayout>
	);
};

export default ChangeNetworkScreen;
