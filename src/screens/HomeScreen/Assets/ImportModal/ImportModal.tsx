import React from 'react';
import { Item } from './Item/Item';

const ImportModal = () => (
	<>
		<Item
			title="Import existing wallet"
			icon="help"
			onPress={() => null}
			first
		/>
		<Item
			title="Import with secret phrase"
			icon="key"
			onPress={() => null}
		/>
		<Item
			title="Restore from iCloud"
			icon="cloud"
			onPress={() => null}
		/>
	</>
);

export default ImportModal;
