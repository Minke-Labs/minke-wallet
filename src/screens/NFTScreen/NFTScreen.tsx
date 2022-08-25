import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { AssetsLayout } from '@layouts';
import { View, Text, Icon, ModalBase, BlankStates, EmptyStates, Touchable } from '@components';
import { useLanguage, useNFT } from '@hooks';
import { InfoModal } from './InfoModal/InfoModal';
import Item from './Item/Item';

const NFTScreen = () => {
	const {
		assets,
		// estimatedValue,
		nftsByCollection
	} = useNFT();
	const [infoModal, setInfoModal] = useState(false);
	const { i18n } = useLanguage();

	if (!assets) return <BlankStates.NFT />;

	const data = Object.keys(nftsByCollection);

	return (
		<>
			<AssetsLayout
				headerValue={1}
				// headerValue={estimatedValue}
				headerTitle={
					<Touchable
						row
						cross="center"
						onPress={() => setInfoModal(true)}
					>
						<Text>
							{i18n.t('NFTScreen.estimated_value')}
						</Text>
						<View mr="xxs" />
						<Icon
							name="infoStroke"
							size={20}
							color="cta1"
						/>
					</Touchable>
				}
			>
				<View ph="xs" pt="s" flex1>
					<Text type="tMedium" weight="bold" mb="s">
						{i18n.t('NFTScreen.assets')}
					</Text>

					{data.length > 0 ? (
						<FlatList
							data={data}
							keyExtractor={(item) => item.toString()}
							renderItem={({ item }) => <Item collection={nftsByCollection[item]} />}
						/>
					) : (
						<EmptyStates.NoTokens />
					)}

				</View>
			</AssetsLayout>

			<ModalBase isVisible={infoModal} onDismiss={() => setInfoModal(false)}>
				<InfoModal onPress={() => setInfoModal(false)} />
			</ModalBase>
		</>
	);
};

export default NFTScreen;
