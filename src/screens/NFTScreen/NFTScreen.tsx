import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { AssetsLayout } from '@layouts';
import { Text, Icon, Modal } from '@components';
import { useLanguage } from '@hooks';
import { InfoModal } from './InfoModal/InfoModal';
import Item from './Item/Item';
import { mock } from './mockRes';

const NFTScreen = () => {
	const [assets, setAssets] = useState<any>();
	const [infoModal, setInfoModal] = useState(false);
	const { i18n } = useLanguage();

	useEffect(() => {
		const mockFiltered = mock.assets.map((item: any) => ({
			name: item.name,
			id: item.id,
			image: item.image_url,
			thumb: item.image_thumbnail_url,
			permalink: item.permalink,
			last_sale: item.last_sale,
			collection: {
				name: item.collection.name,
				desc: item.collection.description,
				slug: item.collection.slug,
				image: item.collection.image_url
			}
		}));
		setAssets(mockFiltered);
	}, []);

	return (
		<>
			<AssetsLayout
				headerValue="5000"
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

					<ScrollView>
						<Item />
						<Item />
						<Item />
						<Item />
						<Item />
						<Item />
					</ScrollView>

				</View>
			</AssetsLayout>

			<Modal isVisible={infoModal} onDismiss={() => setInfoModal(false)}>
				<InfoModal onPress={() => setInfoModal(false)} />
			</Modal>
		</>
	);
};

export default NFTScreen;
