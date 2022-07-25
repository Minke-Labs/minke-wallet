import React from 'react';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

const Save = () => (
	<BlankLayout title="Save">
		<Box mt={32} mb={16} w={105} h={14} br={20} />
		<Box mb={64} w={191} h={42} br={60} />
		<Box w="100%" style={{ flex: 1, borderTopLeftRadius: 22, borderTopRightRadius: 22 }} />
	</BlankLayout>
);

export default Save;
