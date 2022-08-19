/* eslint-disable max-len */
import React from 'react';
import { Text, Paper2 } from '@components';

const About = () => (
	<Paper2 p="s" br="xs">
		<Text type="tMedium" weight="bold" mb="xxs">
			About USD Coin
		</Text>
		<Text type="bSmall" color="text3">
			USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between dollars and trading on cryptocurrency exchanges.{'\n'}The technology behind CENTRE makes it possible to exchange value between people, businesses and financial institutions just like email between mail services and texts between SMS providers. We believe by removing artificial economic borders, we can create a more inclusive global economy.
		</Text>
	</Paper2>
);

export default About;
