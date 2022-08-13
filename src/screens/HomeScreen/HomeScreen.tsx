import React from 'react';
import { ScrollView } from 'react-native';
import { BasicLayout } from '@layouts';
import { Paper2, Text, View, Button } from '@components';

const AssetsBox = () => (
	<Paper2 w={80} br={3} p={3} mb={3} fw>
		<Text>Assets</Text>
		<View h={250} />
	</Paper2>
);

const BuyBox = () => (
	<Paper2 w={80} br={3} p={3} mb={3} fw>
		<Text type="tSmall" weight="bold" color="cta1" mb={3}>
			Buy USDC now!{'\n'}No personal ID required.
		</Text>
		<Text type="lSmall" weight="semiBold" mb={3}>
			Purchase in a few clicks with:
		</Text>
		<View
			h={30}
			bg="alert3"
			mb={4}
		/>
		<Button
			title="Buy USDC now"
			mode="outlined"
		/>
	</Paper2>
);

const StoriesBox = () => (
	<Paper2 w={80} br={3} p={3} fw>
		<Text type="lMedium" weight="semiBold" mb={3}>
			Learn about Minke
		</Text>
		<View
			h={36}
			bg="alert3"
		/>
	</Paper2>
);

const HomeScreen = () => (
	<BasicLayout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View ph={3} mt={3}>
				<AssetsBox />
				<BuyBox />
				<StoriesBox />
			</View>
		</ScrollView>
	</BasicLayout>
);

export default HomeScreen;
