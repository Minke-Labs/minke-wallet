import React from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { AnimatedText, PercChange, View, Text } from '@components';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ price, current, graphs }) => {
	const data = useDerivedValue(() => graphs[current.value].data);
	const percChange = data.value.percentChange > 0;
	const percZero = data.value.percentChange === 0;

	return (
		<View cross="center">

			<AnimatedText
				marginBottom={2}
				text={price}
				weight="bold"
				style={{
					fontSize: 28,
					lineHeight: 34
				}}
			/>

			<Text
				weight="bold"
				type="hMedium"
				color="text2"
			>
				{price.value}
			</Text>

			<PercChange {...{ percZero, percChange, data, current, graphs }} />

		</View>
	);
};

export default Header;
