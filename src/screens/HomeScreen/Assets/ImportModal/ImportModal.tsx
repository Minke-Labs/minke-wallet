import React from 'react';
import { IconItem } from '@components';

interface ImportModalProps {
	onImportSeed: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImportSeed }) => (
	<>
		<IconItem
			title="Import existing wallet"
			icon="help"
			onPress={() => null}
			mb="m"
			component
		/>
		<IconItem
			title="Import with secret phrase"
			icon="key"
			onPress={onImportSeed}
			mb="m"
		/>
		<IconItem
			title="Restore from iCloud"
			icon="cloud"
			onPress={() => null}
			mb="m"
		/>
	</>
);

export default ImportModal;
