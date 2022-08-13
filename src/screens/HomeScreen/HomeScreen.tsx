import React from 'react';
import { BasicLayout } from '@layouts';
import { View } from '@components';

const HomeScreen = () => (
	<BasicLayout>
		<View
			h={200}
			bw={3}
			row
			main="flex-end"
		>
			<View
				w={80}
				h={80}
				br={3}
				color="alert1"
			/>
		</View>
	</BasicLayout>
);

export default HomeScreen;
