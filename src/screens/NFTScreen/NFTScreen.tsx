import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { AssetsLayout } from '@layouts';
import { Text, Icon, Modal } from '@components';
import { useLanguage } from '@hooks';
import { collectionArr } from '@models/openSea';
import { InfoModal } from './InfoModal/InfoModal';
import Item from './Item/Item';

const NFTScreen = () => {
	const [infoModal, setInfoModal] = useState(false);
	const { i18n } = useLanguage();

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

						{
							collectionArr.map((item: string) => (
								<Item slug={item} key={item} />
							))
						}

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
