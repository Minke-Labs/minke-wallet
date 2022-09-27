import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView } from 'react-native';
import { useFormProgress, useGlobalWalletState, useLanguage, useWallets } from '@hooks';
import { Network, networks } from '@models/network';
import { MinkeWallet, smallWalletAddress } from '@models/wallet';
import { TokenType } from '@styles';
import makeBlockie from 'ethereum-blockies-base64';
import Text from '@src/components/Text/Text';
import ListItem from '@src/screens/AccountsScreen/ListItem/ListItem';
import NetworkItem from '@src/screens/ChangeNetworkScreen/ListItem/ListItem';
import Button from '@src/components/Button/Button';
import { Meta } from '@src/hooks/useWalletConnectSessions/types';
import View from '../View/View';
import Icon from '../Icon/Icon';
import Token from '../Token/Token';
import Touchable from '../Touchable/Touchable';

interface Props {
	onDismiss: () => void;
	handleApproval: (approved: boolean, address: string, chainId: number) => void;
	meta: Meta | undefined;
}

const ConnectionRequestModal = ({ onDismiss, handleApproval, meta }: Props) => {
	const { i18n } = useLanguage();
	const { walletsWithPk, address: defaultAddress } = useWallets();
	const { chainId, dappName, dappUrl, imageUrl } = meta || {};
	const { network: settingsNetwork } = useGlobalWalletState();
	const defaultNetwork = Object.values(networks).find((n) => chainId === n.chainId) || settingsNetwork;
	const { currentStep, goForward, goBack, setCurrentStep, reset } = useFormProgress();
	const [selectedWallet, setSelectedWallet] = useState(defaultAddress);
	const [selectedNetwork, setSelectedNetwork] = useState<Network>(defaultNetwork);
	const { name, nativeToken } = selectedNetwork;

	const onSelectWallet = async (w: MinkeWallet) => {
		goBack();
		setSelectedWallet(w.address);
	};

	const onSelectNetwork = (n: Network) => {
		setCurrentStep(0);
		setSelectedNetwork(n);
	};

	const dismiss = () => {
		onDismiss();
		reset();
	};

	return (
		<SafeAreaView>
			{currentStep === 0 && (
				<View pv="l" ph="s">
					<Touchable onPress={dismiss}>
						<View cross="flex-end">
							<Icon name="close" size={24} color="text7" />
						</View>
					</Touchable>
					<View>
						<Text weight="bold" type="tMedium" mb="s">
							{i18n.t('Components.ConnectionRequestModal.connection_request_from')}
						</Text>
						<View row mb="s" cross="center">
							<View>
								{!!imageUrl && (
									<Image
										width={50}
										height={50}
										source={{ uri: imageUrl }}
										style={{
											width: 50,
											height: 50,
											borderRadius: 100
										}}
									/>
								)}
							</View>

							<View ml="xs" flex1>
								<Text type="hSmall" weight="bold" numberOfLines={1}>
									{dappName}
								</Text>
								<Text type="lLarge" weight="semiBold" color="cta1" numberOfLines={1}>
									{dappUrl}
								</Text>
							</View>
						</View>
						<View row mb="s" cross="center" main="space-between">
							<Touchable onPress={goForward}>
								<Text weight="semiBold" type="lMedium" color="text4" mb="xxs">
									{i18n.t('Components.ConnectionRequestModal.switch_wallet')}
								</Text>
								<View row cross="center" main="space-between">
									<View mr="xxs">
										<Image
											source={{ uri: makeBlockie(selectedWallet) }}
											style={{
												width: 24,
												height: 24,
												borderRadius: 100
											}}
										/>
									</View>
									<View mr="xxs">
										<Text weight="semiBold" type="lMedium">
											{smallWalletAddress(selectedWallet)}
										</Text>
									</View>
									<Icon name="chevronDown" color="cta1" size={16} />
								</View>
							</Touchable>
							<Touchable onPress={() => setCurrentStep(2)}>
								<Text weight="semiBold" type="lMedium" color="text4" mb="xxs">
									{i18n.t('Components.ConnectionRequestModal.switch_network')}
								</Text>
								<View row cross="center" main="space-between">
									<View mr="xxs">
										<Token name={nativeToken.symbol.toLowerCase() as TokenType} size={24} />
									</View>
									<View mr="xxs">
										<Text weight="semiBold" type="lMedium">
											{name}
										</Text>
									</View>
									<Icon name="chevronDown" color="cta1" size={16} />
								</View>
							</Touchable>
						</View>
						<View mt="l" row>
							<View flex1>
								<Button
									title={i18n.t('Components.ConnectionRequestModal.cancel')}
									mode="outlined"
									onPress={() => handleApproval(false, selectedWallet, selectedNetwork.chainId)}
								/>
							</View>
							<View mr="s" />
							<View flex1>
								<Button
									title={i18n.t('Components.ConnectionRequestModal.connect')}
									onPress={() => handleApproval(true, selectedWallet, selectedNetwork.chainId)}
								/>
							</View>
						</View>
					</View>
				</View>
			)}
			{currentStep === 1 && (
				<View ph="s" pv="s">
					<View row cross="center" main="space-between">
						<Touchable onPress={goBack} row cross="center">
							<View mr="xs">
								<Icon name="arrowBackStroke" size={24} color="text7" />
							</View>
							<Text type="hSmall" weight="bold">
								{i18n.t('Components.ConnectionRequestModal.switch_wallet')}
							</Text>
						</Touchable>
						<Touchable onPress={dismiss}>
							<Icon name="close" size={24} color="text7" />
						</Touchable>
					</View>

					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={walletsWithPk}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<ListItem
								label={item.address}
								selected={item.address === selectedWallet}
								onPress={() => onSelectWallet(item)}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}
			{currentStep === 2 && (
				<View pv="s" ph="s">
					<View row cross="center" main="space-between">
						<Touchable onPress={() => setCurrentStep(0)} row cross="center">
							<View mr="xs">
								<Icon name="arrowBackStroke" size={24} color="text7" />
							</View>
							<Text type="hSmall" weight="bold">
								{i18n.t('Components.ConnectionRequestModal.switch_network')}
							</Text>
						</Touchable>
						<Touchable onPress={dismiss}>
							<Icon name="close" size={24} color="text7" />
						</Touchable>
					</View>

					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={Object.values(networks)}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<NetworkItem
								label={item.name}
								onPress={() => onSelectNetwork(item)}
								selected={item.id === selectedNetwork.id}
								token={item.nativeToken.symbol}
								testnet={item.testnet}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default ConnectionRequestModal;
