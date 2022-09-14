import React from 'react';
import { View } from 'react-native';
import { TokenType } from '@styles';
import { useNetwork } from '@hooks';
import ModalBase from '../../ModalBase/ModalBase';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import Touchable from '../../Touchable/Touchable';
import { NetworkModalProps } from './NetworkModal.types';
import styles from './NetworkModal.styles';

const NetworkModal: React.FC<NetworkModalProps> = ({ isVisible, onDismiss }) => {
	const { network } = useNetwork();

	return (
		<ModalBase {...{ isVisible, onDismiss }}>
			<View style={styles.container}>
				<View style={styles.closeContainer}>
					<Touchable onPress={onDismiss}>
						<Icon name="close" size={24} color="text7" />
					</Touchable>
				</View>

				<Token size={56} glow name={network?.id as TokenType} />
				<Text type="h3" weight="extraBold" mb="xs" style={{ marginTop: 40 }}>
					{network?.name} network
				</Text>
				<Text center mb="xxl">
					If you&apos;re receiving from an exchange or wallet make sure they support withdrawals on the{' '}
					{network?.name} network.
				</Text>
			</View>
		</ModalBase>
	);
};

export default NetworkModal;
