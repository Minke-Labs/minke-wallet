import React from 'react';
import { View, Image, SafeAreaView, Linking } from 'react-native';
import { Text, NetworkWarning, Button } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
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

	return (
		<View style={{ flex: 1, backgroundColor: colors.background5 }}>
			<SafeAreaView />

			<View style={styles.topContainer}>
				<Header title={nft.name} />
				<Image
					source={{ uri: nft.image }}
					style={styles.image}
				/>
				<Text type="hMedium" weight="bold">{nft.name}</Text>
				<View style={styles.byContainer}>
					<Text type="tSmall" weight="bold">
						{i18n.t('NFTDetailScreen.by')}
					</Text>
					<Text type="tSmall" weight="bold" color="cta1">
						{nft.collection.name}
					</Text>
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
					onPress={() => Linking.openURL(nft.permalink)}
				/>
				<Expander
					title={`${i18n.t('NFTDetailScreen.about')} ${nft.collection.name}`}
					desc={nft.collection.desc}
				/>
				<SafeAreaView />
			</Bottom>

		</View>
	);
};

export default NFTDetailScreen;
