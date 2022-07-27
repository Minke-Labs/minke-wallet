/* eslint-disable max-len */
import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Text, NetworkWarning, Button } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { Bottom } from './Bottom/Bottom';
import { Expander } from './Expander/Expander';
import { Panel } from './Panel/Panel';
import styles from './NFTDetailScreen.styles';
import { Header } from './Header/Header';

const collection = 'Doodles';
const id = '#3842';
const title = `${collection} ${id}`;
const desc = 'A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury.';

const NFTDetailScreen = () => {
	const { colors } = useTheme();
	const { i18n } = useLanguage();
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
					<Text type="tSmall" weight="bold" color="cta1">{collection}</Text>
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
					title={`${i18n.t('NFTDetailScreen.about')} ${collection}`}
					desc={desc}
				/>
				<SafeAreaView />
			</Bottom>

		</View>
	);
};

export default NFTDetailScreen;
