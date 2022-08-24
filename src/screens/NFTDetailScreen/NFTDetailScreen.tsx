import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, SafeAreaView, Linking, StatusBar } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Text, Button } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { Stats } from '@models/types/nft.types';
import { tokenBalanceFormat } from '@helpers/utilities';
import { getCollectionStats } from '@src/services/apis';
import { whale2Img } from '@images';
import { Bottom } from './Bottom/Bottom';
import { Expander } from './Expander/Expander';
import { Panel } from './Panel/Panel';
import styles from './NFTDetailScreen.styles';
import { Header } from './Header/Header';

type Props = NativeStackScreenProps<RootStackParamList, 'NFTDetailScreen'>;
const NFTDetailScreen = ({ route }: Props) => {
	const { nft } = route.params;
	const { colors } = useTheme();
	const { i18n } = useLanguage();
	const [stats, setStats] = useState<Stats>({} as Stats);

	useEffect(() => {
		const fetchAssets = async () => {
			const nftStats = await getCollectionStats(nft.collection.slug);
			setStats(nftStats);
		};
		fetchAssets();
	}, [nft.collection]);

	const lastSalePrice = useCallback(() => {
		const { last_sale: lastSale } = nft;
		if (lastSale) {
			const {
				quantity,
				total_price: totalPrice,
				payment_token: { decimals, symbol }
			} = lastSale;
			const pricePerToken = toBn(totalPrice, decimals).div(toBn(quantity));
			return `${formatUnits(pricePerToken, decimals)} ${symbol}`;
		}

		return 'N/A';
	}, [nft]);
	const { image_original_url: original, image_url: imageUrl } = nft;
	const image = imageUrl || original;

	return (
		<View style={{ flex: 1, backgroundColor: colors.background5, paddingTop: StatusBar.currentHeight }}>
			<SafeAreaView />

			<View style={styles.topContainer}>
				<Header title={nft.collection.name} />
				{image ? (
					image.endsWith('.svg') ? (
						<View style={{ borderRadius: 8, overflow: 'hidden' }}>
							<SvgUri uri={image} width={256} height={256} />
						</View>
					) : (
						<Image source={{ uri: image }} style={styles.image} />
					)
				) : (
					<Image source={whale2Img} style={styles.image} />
				)}
				<Text type="hMedium" weight="bold">
					{nft.name}
				</Text>
				<View style={styles.byContainer}>
					<Text type="tSmall" weight="bold">
						{i18n.t('NFTDetailScreen.by')}
					</Text>
					<Text type="tSmall" weight="bold" color="cta1">
						{nft.collection.name}
					</Text>
				</View>
			</View>

			<Bottom>
				<Panel
					floor={
						stats?.floor_price > 0.00001
							? `${tokenBalanceFormat(stats!.floor_price, 4)} ${nft.stats?.symbol || 'ETH'}`
							: 'N/A'
					}
					lastSale={lastSalePrice()}
				/>
				<Button
					iconRight="openInNew"
					title={i18n.t('NFTDetailScreen.view_on_openSea')}
					marginBottom={16}
					onPress={() => Linking.openURL(nft.permalink)}
				/>
				{!!nft.collection.description && (
					<Expander
						title={`${i18n.t('NFTDetailScreen.about')} ${nft.collection.name}`}
						desc={nft.collection.description}
					/>
				)}
				<SafeAreaView />
			</Bottom>
		</View>
	);
};

export default NFTDetailScreen;
