import React from 'react';
import { BasicLayout } from '@layouts';
import { View } from '@components';

const HomeScreen = () => (
	<BasicLayout>
		<View
			h={200}
			bw={4}
		>
			<View
				w={80}
				h={80}
				br={3}
				bg="alert3"
			/>
		</View>
	</BasicLayout>
);

export default HomeScreen;
