import React from 'react';
import { Paper2, Text, View, Button } from '@components';

export const Assets = () => (
	<Paper2 br={3} p={3} mb={3}>
		<View row main="space-between" cross="center" mb={4}>
			<View>
				<Text type="lMedium" weight="semiBold" color="text3">
					Your total assets
				</Text>
				<Text type="dMedium">
					$200.00
				</Text>
			</View>
			<View round={57} bg="alert3" />
		</View>
		<View row>
			<Button
				title="Add funds"
				onPress={() => null}
			/>
			{/* <Button
				title="..."
			/> */}
		</View>
	</Paper2>
);
