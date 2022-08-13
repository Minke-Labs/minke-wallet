import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { Paper2, Text, View, Button, Icon } from '@components';
import { spacing } from '@styles';

const AssetsBox = () => (
	<Paper2 br={3} p={3} mb={3}>
		<Text>Assets</Text>
		<View h={150} />
	</Paper2>
);

const BuyBox = () => (
	<Paper2 br={3} p={3} mb={3}>
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
			onPress={() => null}
		/>
	</Paper2>
);

const StoriesBox = () => (
	<Paper2 br={3} p={3}>
		<Text type="lMedium" weight="semiBold" mb={3}>
			Learn about Minke
		</Text>
		<View
			h={36}
			bg="alert3"
		/>
	</Paper2>
);

const Selector = () => (
	<View
		cross="center"
		s={1}
		style={{
			position: 'absolute',
			width: '100%',
			bottom: spacing[6]
		}}
	>
		<Paper2
			w={196}
			h={52}
			br={6}
			row
			main="space-between"
			cross="center"
			ph={4}
		>
			<TouchableOpacity onPress={() => null}>
				<Icon name="home" size={28} color="cta1" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => null}>
				<Icon name="exchange" size={28} color="cta2" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => null}>
				<Icon name="hub" size={28} color="cta2" />
			</TouchableOpacity>
		</Paper2>
	</View>
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
		<Selector />
	</BasicLayout>
);

export default HomeScreen;
