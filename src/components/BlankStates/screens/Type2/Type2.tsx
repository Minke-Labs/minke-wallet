import React from 'react';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

interface Type2Props {
	title: string;
}

const Type2: React.FC<Type2Props> = ({ title }) => (
	<BlankLayout title={title}>
		<Box mt="s" mb="xs" w={105} h={14} br="s" />
		<Box mb="xxl" w={191} h={42} br="xxl" />
		<Box w="100%" flex1 btlr="s" btrr="s" />
	</BlankLayout>
);

export default Type2;
