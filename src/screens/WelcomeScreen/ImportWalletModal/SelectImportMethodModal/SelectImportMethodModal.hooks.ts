import { useEffect, useMemo, useState } from 'react';
import { useTheme, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { forEach } from 'lodash';

export const useSelectImportMethodModal = () => {
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

	return {
		colors,
		latestBackup,
		walletsBackedUp
	};
};
