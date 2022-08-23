import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { numberFormat } from '@helpers/utilities';
import { Paper, Text, View, Button, Modal, ModalBase } from '@components';
import { AddFunds } from '@containers';
import { useAvatar, useFormProgress, useLanguage, useWalletState } from '@hooks';
import AvatarModal from './AvatarModal/AvatarModal';
import ImportModal from './ImportModal/ImportModal';

export const Assets: React.FC = () => {
	const { i18n } = useLanguage();
	const [importModal, setImportModal] = useState(false);
	const [addFundsVisible, setAddFundsVisible] = useState(false);
	const { currentStep, goBack, goForward } = useFormProgress();
	const [visible, setVisible] = useState(false);
	const { state } = useWalletState();
	const { address, balance } = state.value;
	const { currentAvatar } = useAvatar();

	return (
		<>
			<Paper p="xs" mb="xs">
				<View row main="space-between" cross="center" mb="s">
					<View>
						<Text type="lMedium" weight="semiBold" color="text3">
							{i18n.t('WalletScreen.AssetsPanel.your_total_assets')}
							{/* @@@  - CHANGE LOCAL OF TRANSLATIONS  */}
						</Text>
						<Text type="dMedium">
							{numberFormat(balance?.usd || 0)}
						</Text>
					</View>
					<TouchableOpacity onPress={() => setVisible(true)}>
						{!!address && (
							<Image
								source={currentAvatar.image}
								style={{
									width: 56,
									height: 56,
									borderRadius: 28
								}}
							/>
						)}
					</TouchableOpacity>
				</View>
				<View row main="space-between">
					<View style={{ flex: 1 }}>
						<Button
							iconLeft="add"
							title="Add funds"
							onPress={() => setAddFundsVisible(true)}
						/>
					</View>
					<View mr="xxs" />
					<View w={48}>
						<Button
							title="..."
							onPress={() => setImportModal(true)}
							br="xs"
						/>
					</View>
				</View>
			</Paper>
			<Modal
				isVisible={visible}
				onDismiss={() => setVisible(false)}
				{...(currentStep !== 0 && { onBack: goBack })}
			>
				<AvatarModal
					currentStep={currentStep}
					onBack={goBack}
					onSelectAvatar={goForward}
				/>
			</Modal>
			<ModalBase isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</ModalBase>
			<Modal isVisible={importModal} onDismiss={() => setImportModal(false)}>
				<ImportModal />
			</Modal>
		</>
	);
};
