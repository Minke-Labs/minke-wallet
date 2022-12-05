import React from 'react';
import { View } from 'react-native';
import { useGlobalWalletState, useLanguage } from '@hooks';
import ModalBase from '../../ModalBase/ModalBase';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import Touchable from '../../Touchable/Touchable';
import { NetworkModalProps } from './NetworkModal.types';
import styles from './NetworkModal.styles';

const NetworkModal: React.FC<NetworkModalProps> = ({ isVisible, onDismiss }) => {
	const { network } = useGlobalWalletState();
	const { i18n } = useLanguage();

	return (
		<ModalBase {...{ isVisible, onDismiss }}>
			<View style={styles.container}>
				<View style={styles.closeContainer}>
					<Touchable onPress={onDismiss}>
						<Icon name="close" size={24} color="text7" />
					</Touchable>
				</View>

				<Token size={56} glow token={{ symbol: network.id, decimals: 0, address: '', chainId: 0 }} />
				<Text type="h3" weight="extraBold" mb="xs" style={{ marginTop: 40 }}>
					{i18n.t('NetworkModal.network', { network: network.name })}
				</Text>
				<Text center mb="xxl">
					{i18n.t('NetworkModal.if_you_receiving')}.
					{i18n.t('NetworkModal.network', { network: network.name })}.
				</Text>
			</View>
		</ModalBase>
	);
};

export default NetworkModal;
