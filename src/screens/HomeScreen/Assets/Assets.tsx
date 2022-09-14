import React, { useState } from 'react';
import { Image } from 'react-native';
import { numberFormat } from '@helpers/utilities';
import { Paper, Text, View, Button, Modal, ModalBase, Touchable, ModalReusables } from '@components';
import { AddFunds } from '@containers';
import { useAvatar, useBalances, useFormProgress, useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { AvatarModal, ImportModal } from './Modals';

export const Assets: React.FC = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const [importSeed, setImportSeed] = useState(false);
	const [importModal, setImportModal] = useState(false);
	const [addFundsVisible, setAddFundsVisible] = useState(false);
	const { currentStep, goBack, goForward } = useFormProgress();
	const [visible, setVisible] = useState(false);
	const { address } = useGlobalWalletState();
	const { balance } = useBalances();
	const { currentAvatar } = useAvatar();

	const handleImportModal = () => {
		setImportModal(false);
		setImportSeed(true);
	};

	const onSeedImportFinished = () => {
		setImportSeed(false);
		navigation.navigate('WalletCreatedScreen');
	};

	return (
		<>
			<Touchable onPress={() => navigation.navigate('MinkeHubScreen')}>
				<Paper p="xs" mb="xs">
					<View row main="space-between" cross="center" mb="s">
						<View>
							<Text type="lMedium" weight="semiBold" color="text3">
								{i18n.t('HomeScreen.Assets.your_total_assets')}
							</Text>
							<Text type="dMedium">{numberFormat(balance)}</Text>
						</View>
						<Touchable onPress={() => setVisible(true)}>
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
						</Touchable>
					</View>
					<View row main="space-between">
						<View style={{ flex: 1 }}>
							<Button
								iconLeft="add"
								title={i18n.t('HomeScreen.Assets.add_funds')}
								onPress={() => setAddFundsVisible(true)}
							/>
						</View>
						<View mr="xxs" />
						<View w={48}>
							<Button title="···" onPress={() => setImportModal(true)} br="xs" />
						</View>
					</View>
				</Paper>
			</Touchable>

			<Modal
				isVisible={visible}
				onDismiss={() => setVisible(false)}
				{...(currentStep !== 0 && { onBack: goBack })}
			>
				<AvatarModal currentStep={currentStep} onBack={goBack} onSelectAvatar={goForward} />
			</Modal>

			<ModalBase isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</ModalBase>

			<Modal isVisible={importModal} onDismiss={() => setImportModal(false)}>
				<ImportModal onImportSeed={handleImportModal} onDismiss={() => setImportModal(false)} />
			</Modal>

			<ModalBase isVisible={importSeed} onDismiss={() => setImportSeed(false)}>
				<ModalReusables.ImportWallet
					onDismiss={() => setImportSeed(false)}
					onImportFinished={onSeedImportFinished}
				/>
			</ModalBase>
		</>
	);
};
