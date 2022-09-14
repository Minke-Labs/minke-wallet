import React from 'react';
import { Text, View } from '@components';

export const Rate: React.FC<{ count: number; }> = ({ count }) => (
	<View
		bw={1}
		br="xxs"
		ph="s"
		main="center"
		cross="center"
		bc="background3"
		style={{ overflow: 'hidden' }}
	>
		<View
			w={count * 1.08}
			bgc="background3"
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0
			}}
		/>
		<View style={{ position: 'absolute' }}>
			{count >= 0 && (
				<Text type="span" weight="bold">
					0:{count < 10 ? `0${count}` : count}
				</Text>
			)}
		</View>
	</View>
);
