import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Paper2, Text, View, Button, Modal, ModalBase } from '@components';
import { AddFunds } from '@containers';
import { useAvatar, useFormProgress, useWalletState } from '@hooks';
import AvatarModal from './AvatarModal/AvatarModal';
import ImportModal from './ImportModal/ImportModal';

export const Assets: React.FC = () => {
	const [importModal, setImportModal] = useState(false);
	const [addFundsVisible, setAddFundsVisible] = useState(false);
	const { currentStep, goBack, goForward } = useFormProgress();
	const [visible, setVisible] = useState(false);
	const { state } = useWalletState();
	const { address } = state.value;
	const { currentAvatar } = useAvatar();
	return (
		<>
			<Paper2 br={3} p={3} mb={3}>
				<View row main="space-between" cross="center" mb={4}>
					<View>
						<Text type="lMedium" weight="semiBold" color="text3">
							Your total assets
						</Text>
						<Text type="dMedium">
							$200.00
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
					<View w={255}>
						<Button
							iconLeft="add"
							title="Add funds"
							onPress={() => setAddFundsVisible(true)}
						/>
					</View>
					<View w={48}>
						<Button
							title="..."
							onPress={() => setImportModal(true)}
							br={3}
						/>
					</View>
				</View>
			</Paper2>
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
