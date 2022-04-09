import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TokenType } from '@styles';
import { useNetwork } from '@hooks';
import Modal from '../../Modal/Modal';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import { NetworkModalProps } from './NetworkModal.types';
import styles from './NetworkModal.styles';

const NetworkModal: React.FC<NetworkModalProps> = ({ isVisible, onDismiss }) => {
	const { network } = useNetwork();

	return (
		<Modal {...{ isVisible, onDismiss }}>
			<View style={styles.container}>
				<View style={styles.closeContainer}>
					<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
						<Icon name="closeStroke" size={24} color="text7" />
					</TouchableOpacity>
				</View>

				<Token size={56} glow name={network?.id as TokenType} />
				<Text type="h3" weight="extraBold" marginBottom={16} style={{ marginTop: 40 }}>
					{network?.name} network
				</Text>
				<Text center marginBottom={56}>
					If you&apos;re receiving from an exchange or wallet make sure they support withdrawals on the{' '}
					{network?.name} network.
				</Text>
			</View>
		</Modal>
	);
};

export default NetworkModal;
