import React from 'react';
import View from '@src/components/View/View';
import { deviceWidth } from '@styles';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

interface Type1Props {
	title: string;
}

const Type1: React.FC<Type1Props> = ({ title }) => (
	<BlankLayout title={title}>
		<View mv="s">
			<Box w={deviceWidth - 32} h={228} br="xs" />
		</View>
		<View mb="xxs" pl="xs" w="100%" row>
			<Box w={343} h={75} br="xs" mr="xxs" />
			<Box w={343} h={75} br="xs" />
		</View>
		<Box mb="xxs" w={56} h={16} br="xs" />
	</BlankLayout>
);

export default Type1;
