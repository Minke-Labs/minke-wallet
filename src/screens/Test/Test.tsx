import React from 'react';
import { View } from 'react-native';
import { InterestBanner } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => (
	<BasicLayout>
		<View style={{ flexDirection: 'row', marginTop: 160 }}>
			<InterestBanner
				// token
				// bold
				apy="2.40"
			/>
		</View>
	</BasicLayout>
);

export default Test;
