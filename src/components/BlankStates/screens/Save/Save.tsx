import React from 'react';
import Box from '../../Box/Box';
import SettingsHeader from '../../../SettingsHeader/SettingsHeader';
import BlankLayout from '../../BlankLayout/BlankLayout';

const Save = () => (
	<BlankLayout>
		<SettingsHeader title="Wallet" onPress={() => null} />
		<Box mt={136} mb={16} w={105} h={14} br={20} />
		<Box mb={64} w={191} h={42} br={60} />
		<Box w="100%" style={{ flex: 1, borderTopLeftRadius: 22, borderTopRightRadius: 22 }} />
	</BlankLayout>
);

export default Save;
