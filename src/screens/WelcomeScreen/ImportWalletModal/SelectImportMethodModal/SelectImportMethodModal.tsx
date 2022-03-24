import React, { useEffect, useMemo, useState } from 'react';
import { Text, Icon } from '@components';
import { useTheme, useWallets } from '@hooks';
import { TouchableOpacity, View } from 'react-native';
import { findLatestBackUpOnICloud } from '@models/backup';
import { forEach } from 'lodash';
import { SelectImportMethodModalProps } from './SelectImportMethodModal.types';
import styles from './SelectImportMethodModal.styles';

const SelectImportMethodModal = ({ onICloudBackup, onImportWithSecret }: SelectImportMethodModalProps) => {
	const { colors } = useTheme();
	const { wallets } = useWallets();
	const [latestBackup, setLatestBackup] = useState<string | null>();

	useEffect(() => {
		const fetchBackupsFiles = async () => {
			setLatestBackup(await findLatestBackUpOnICloud());
		};

		fetchBackupsFiles();
	}, []);

	const walletsBackedUp = useMemo(() => {
		let count = 0;
		forEach(wallets, (wallet) => {
			if (wallet.backedUp) {
				count += 1;
			}
		});
		return count;
	}, [wallets]);

	return (
		<>
			<Text weight="extraBold" type="h3" marginBottom={40}>
				Import wallet
			</Text>
			{(walletsBackedUp > 0 || !!latestBackup) && (
				<TouchableOpacity style={styles.container} onPress={onICloudBackup}>
					<View style={styles.leftContainer}>
						<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
							<Icon name="backupStroke" size={24} color="text7" />
						</View>
						<View style={{ marginLeft: 16 }}>
							<Text type="p2" weight="bold">
								Restore from iCloud
							</Text>
							{walletsBackedUp > 0 && (
								<Text type="a">
									You have {walletsBackedUp} {walletsBackedUp > 1 ? 'wallets' : 'wallet'} backed up
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
					<Text weight="bold" type="p2" style={{ marginLeft: 16 }}>
						Import with secret phrase
					</Text>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default SelectImportMethodModal;
