import React from 'react';
import { Image } from 'react-native';
import { IconItem, View } from '@components';
import Metamask from './metamask.png';
import Rainbow from './rainbow.png';
import Twt from './twt.png';

const Images = () => (
	<View row pl="xxs" cross="center">
		<Image source={Metamask} />
		<View mr="xxs" />
		<Image source={Rainbow} />
		<View mr="xxs" />
		<Image source={Twt} />
	</View>
);

const ImportModal = () => (
	<>
		<IconItem
			title="Import existing wallet"
			icon="help"
			onPress={() => null}
			mb="m"
			component={<Images />}
		/>
		<IconItem
			title="Import with secret phrase"
			icon="key"
			onPress={() => null}
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
