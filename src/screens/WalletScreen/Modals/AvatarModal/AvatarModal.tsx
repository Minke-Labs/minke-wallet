/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { AvatarModalProps } from './AvatarModal.types';
import { Select } from './Select';

const AvatarModal: React.FC<AvatarModalProps> = ({ onDismiss }) => (
	<SafeAreaView>
		{/* <Chosen onDismiss={onDismiss} /> */}
		<Select onDismiss={onDismiss} />
	</SafeAreaView>
);

export default AvatarModal;
