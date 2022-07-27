import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Text, NetworkWarning, Button } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { getCollectionInfo } from '@models/openSea';
import { Bottom } from './Bottom/Bottom';
import { Expander } from './Expander/Expander';
import { Panel } from './Panel/Panel';
import styles from './NFTDetailScreen.styles';
import { Header } from './Header/Header';

const id = '#3842';
const collectionSlug = 'doodles-official';

const NFTDetailScreen = () => {
	const [collectionInfo, setCollectionInfo] = useState<any>();
	const { colors } = useTheme();
	const { i18n } = useLanguage();

	const title = `${collectionInfo?.name || ''} ${id}`;

	useEffect(() => {
		const fetchData = async () => {
			const res = await getCollectionInfo({ slug: collectionSlug });
			if (res) setCollectionInfo(res);
		};
		fetchData();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: colors.background5 }}>
			<SafeAreaView />

			<View style={styles.topContainer}>
				<Header title={title} />
				<Image
					source={require('../NFTScreen/mockImages/2.png')}
					style={styles.image}
				/>
				<Text type="hMedium" weight="bold">{title}</Text>
				<View style={styles.byContainer}>
					<Text type="tSmall" weight="bold">
						{i18n.t('NFTDetailScreen.by')}
					</Text>
					<Text type="tSmall" weight="bold" color="cta1">{collectionInfo?.name || ''}</Text>
				</View>
				<NetworkWarning.Tag title={i18n.t('NFTDetailScreen.this_nft')} />
			</View>

			<Bottom>
				<Panel
					floor="$200.00"
					lastSale="$20.12"
				/>

				<Button
					iconRight="openInNew"
					title={i18n.t('NFTDetailScreen.view_on_openSea')}
					marginBottom={16}
					onPress={() => null}
				/>

				<Expander
					title={`${i18n.t('NFTDetailScreen.about')} ${collectionInfo?.name || ''}`}
					desc={collectionInfo?.desc || ''}
				/>
				<SafeAreaView />
			</Bottom>

		</View>
	);
};

export default NFTDetailScreen;
