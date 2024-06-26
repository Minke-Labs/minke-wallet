import React from 'react';
import { Text, View } from '@components';
import { numberFormat } from '@helpers/utilities';
import Header from '../Header/Header';
import { ValueBoxProps } from './ValueBox.types';
import { Background } from './Background/Background';

const ValueBox: React.FC<ValueBoxProps> = ({ value, title }) => (
	<Background>
		<Header />
		<View h={207} cross="center">
			{title}
			<Text type="dLarge" mb="xxs">
				{numberFormat(value)}
			</Text>
		</View>
	</Background>
);

export default ValueBox;
