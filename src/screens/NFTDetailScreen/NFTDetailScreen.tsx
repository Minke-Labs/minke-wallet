/* eslint-disable max-len */
import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Text, NetworkWarning, Button } from '@components';
import { useTheme } from '@hooks';
import { Bottom } from './Bottom/Bottom';
import { Expander } from './Expander/Expander';
import { Panel } from './Panel/Panel';

const NFTDetailScreen = () => {
	const { colors } = useTheme();
	return (
		<View style={{ flex: 1, backgroundColor: colors.background5 }}>
			<SafeAreaView />

			<View style={{ alignItems: 'center', paddingBottom: 16 }}>
				<Image
					source={require('../NFTScreen/mockImages/2.png')}
					style={{
						width: 216,
						height: 216,
						borderRadius: 8,
						marginBottom: 8
					}}
				/>
				<Text type="hMedium" weight="bold">Doodle #3842</Text>
				<View style={{ flexDirection: 'row', marginBottom: 16 }}>
					<Text type="tSmall" weight="bold">by </Text>
					<Text type="tSmall" weight="bold" color="cta1">Doodles</Text>
				</View>
				<NetworkWarning.Tag />
			</View>

			<Bottom>
				<Panel
					floor="$200.00"
					lastSale="$20.12"
				/>

				<Button
					iconRight="openInNew"
					title="View on OpenSea"
					marginBottom={16}
					onPress={() => null}
				/>

				<Expander
					title="About Doodles"
					desc="A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury."
				/>
				<SafeAreaView />
			</Bottom>

		</View>
	);
};

export default NFTDetailScreen;
