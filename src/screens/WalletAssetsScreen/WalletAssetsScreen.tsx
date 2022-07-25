/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { useLanguage, useTokens } from '@hooks';
import { AddFunds } from '@containers';
import { AssetsLayout } from '@layouts';
import { ActivityIndicator, Modal, Text } from '@components';
import { numberFormat } from '@helpers/utilities';
import RNUxcam from 'react-native-ux-cam';
import { MinkeToken } from '@models/token';
import AssetList from './AssetList/AssetList';
import AssetListEmpty from './AssetListEmpty/AssetListEmpty';

interface ContentProps {
	tokens: MinkeToken[];
	onPress: () => void;
}

const Content: React.FC<ContentProps> = ({ tokens, onPress }) => (
	<>
		{tokens === undefined ? (
			<View style={{ marginTop: 24 }}>
				<ActivityIndicator />
			</View>
		) : tokens.length > 0 ? (
			<AssetList walletTokens={tokens} />
		) : (
			<AssetListEmpty onPress={onPress} />
		)}
	</>
);

const WalletAssetsScreen = () => {
	const { i18n } = useLanguage();
	RNUxcam.tagScreenName('WalletAssetsScreen');
	const [addFundsVisible, setAddFundsVisible] = React.useState(false);
	const { tokens, walletBalance: balance } = useTokens();

	return (
		<>
			<AssetsLayout
				headerValue={balance === undefined ? '' : numberFormat(balance || 0)}
				headerTitle={(
					<Text marginBottom={10}>
						{i18n.t('WalletAssetsScreen.ValueBox.current_value')}
					</Text>
				)}
			>
				<Content
					tokens={tokens}
					onPress={() => setAddFundsVisible(true)}
				/>
			</AssetsLayout>
			<Modal isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</Modal>
		</>
	);
};

export default WalletAssetsScreen;
