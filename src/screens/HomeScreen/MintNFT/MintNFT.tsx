import React from 'react';

import { Button, Paper, Text, Touchable, View } from '@components';
import { useLanguage, useNavigation } from '@hooks';

import NFT1 from './nfts/nft1.svg';
import NFT2 from './nfts/nft2.svg';
import NFT3 from './nfts/nft3.svg';
import NFT4 from './nfts/nft4.svg';

export const MintNFT: React.FC = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	return (
		<Touchable onPress={() => navigation.navigate('MintNFTScreen')}>
			<Paper p="xs" mb="xs">
				<View mb="s">
					<View mb="xs">
						<Text type="tSmall" weight="bold" color="cta1" mb="xxxs">
							{i18n.t('HomeScreen.MintNFT.mint_a_minke_whale_nft')}
						</Text>
						<Text type="lSmall" weight="semiBold" color="text2">
							{i18n.t('HomeScreen.MintNFT.complete_two_tasks')}
						</Text>
					</View>
					<View row>
						<View mr="xxs">
							<NFT1 />
						</View>
						<View mr="xxs">
							<NFT2 />
						</View>
						<View mr="xxs">
							<NFT3 />
						</View>
						<View mr="xxs">
							<NFT4 />
						</View>
					</View>
				</View>
				<Button
					title={i18n.t('HomeScreen.MintNFT.mint_nft')}
					onPress={() => navigation.navigate('MintNFTScreen')}
					mb="xxs"
				/>
			</Paper>
		</Touchable>
	);
};
