/* eslint-disable max-len */
import React from 'react';
import { Text, Icon } from '@components';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@hooks';
import { SelectImportMethodModalProps } from './SelectImportMethodModal.types';
import styles from './SelectImportMethodModal.styles';
import { useSelectImportMethodModal } from './SelectImportMethodModal.hooks';

const SelectImportMethodModal = ({ onICloudBackup, onImportWithSecret }: SelectImportMethodModalProps) => {
	const { i18n } = useLanguage();
	const { colors, latestBackup, walletsBackedUp } = useSelectImportMethodModal();

	return (
		<>
			<Text weight="extraBold" type="h3" marginBottom={40}>
				{i18n.t('WelcomeScreen.ImportWalletModal.SelectImportMethodModal.import_wallet')}
			</Text>
			{(walletsBackedUp > 0 || !!latestBackup) && (
				<TouchableOpacity style={styles.container} onPress={onICloudBackup}>
					<View style={styles.leftContainer}>
						<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
							<Icon name="backupStroke" size={24} color="text7" />
						</View>
						<View style={{ marginLeft: 16 }}>
							<Text type="p2" weight="bold">
								{i18n.t('WelcomeScreen.ImportWalletModal.SelectImportMethodModal.restore_from_icloud')}
							</Text>
							{walletsBackedUp > 0 && (
								<Text type="a">
									{i18n.t('WelcomeScreen.ImportWalletModal.SelectImportMethodModal.backup_wallets_count', {
										count: walletsBackedUp,
										plural: walletsBackedUp > 1 ? 's' : ''
									})}
								</Text>
							)}
						</View>
					</View>
				</TouchableOpacity>
			)}
			<TouchableOpacity style={styles.container} onPress={onImportWithSecret}>
				<View style={styles.leftContainer}>
					<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
						<Icon name="vaultStroke" size={24} color="text7" />
					</View>
					<Text weight="bold" type="p2" style={{ marginLeft: 16 }} width={250}>
						{i18n.t('WelcomeScreen.ImportWalletModal.SelectImportMethodModal.import_with_secret_phrase')}
					</Text>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default SelectImportMethodModal;
