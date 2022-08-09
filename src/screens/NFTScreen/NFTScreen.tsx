import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { AssetsLayout } from '@layouts';
import { Text, Icon, Modal, BlankStates } from '@components';
import { useLanguage, useNFT } from '@hooks';
import { InfoModal } from './InfoModal/InfoModal';
import Item from './Item/Item';

const NFTScreen = () => {
	const { assets, estimatedValue, nftsByCollection } = useNFT();
	const [infoModal, setInfoModal] = useState(false);
	const { i18n } = useLanguage();

	if (!assets) return <BlankStates.NFT />;

	return (
		<>
			<AssetsLayout
				headerValue={estimatedValue}
				headerTitle={(
					<TouchableOpacity
						style={{ flexDirection: 'row', alignItems: 'center' }}
						onPress={() => setInfoModal(true)}
					>
						<Text style={{ marginRight: 8 }}>
							{i18n.t('NFTScreen.estimated_value')}
						</Text>
						<Icon name="infoStroke" size={20} color="cta1" />
					</TouchableOpacity>
				)}
			>
				<View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
					<Text type="tMedium" weight="bold" marginBottom={24}>
						{i18n.t('NFTScreen.assets')}
					</Text>
					<FlatList
						data={Object.keys(nftsByCollection)}
						keyExtractor={(item) => item.toString()}
						renderItem={({ item }) => (
							<Item collection={nftsByCollection[item]} />
						)}
					/>
				</View>
			</AssetsLayout>

			<Modal isVisible={infoModal} onDismiss={() => setInfoModal(false)}>
				<InfoModal onPress={() => setInfoModal(false)} />
			</Modal>
		</>
	);
};

export default NFTScreen;
