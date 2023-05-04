import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { Image, SafeAreaView } from 'react-native';

import { useGlobalWalletState, useLanguage } from '@hooks';
import { MinkeToken } from '@models/types/token.types';
import { smallWalletAddress } from '@models/wallet';
import Button from '@src/components/Button/Button';
import Text from '@src/components/Text/Text';

import Icon from '../Icon/Icon';
import TextArea from '../TextArea/TextArea';
import Token from '../Token/Token';
import Touchable from '../Touchable/Touchable';
import View from '../View/View';

interface RequestSource {
	imageUrl?: string;
	name: string;
	url: string;
}

interface Props {
	onDismiss: () => void;
	onSign: () => void;
	requestSource: RequestSource;
	message: string;
}

const SignatureRequestModal = ({ onDismiss, onSign, requestSource, message }: Props) => {
	const { i18n } = useLanguage();
	const { address, network } = useGlobalWalletState();
	const { imageUrl, name, url } = requestSource;

	return (
		<SafeAreaView>
			<View pv="l" ph="s">
				<Touchable onPress={onDismiss}>
					<View cross="flex-end">
						<Icon name="close" size={24} color="text7" />
					</View>
				</Touchable>
				<View>
					<Text weight="bold" type="tMedium" mb="s">
						{i18n.t('Components.SignatureRequestModal.message_signing_request_from')}
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
								{name}
							</Text>
							<Text type="lLarge" weight="semiBold" color="cta1" numberOfLines={1}>
								{url}
							</Text>
						</View>
					</View>
					<View row mb="s" cross="center" main="space-between">
						<View>
							<Text weight="semiBold" type="lMedium" color="text4" mb="xxs">
								{i18n.t('Components.SignatureRequestModal.wallet')}
							</Text>
							<View row cross="center" main="space-between">
								<View mr="xxs">
									<Image
										source={{ uri: makeBlockie(address) }}
										style={{
											width: 24,
											height: 24,
											borderRadius: 100
										}}
									/>
								</View>
								<View mr="xxs">
									<Text weight="semiBold" type="lMedium">
										{smallWalletAddress(address)}
									</Text>
								</View>
							</View>
						</View>
						<View>
							<Text weight="semiBold" type="lMedium" color="text4" mb="xxs">
								{i18n.t('Components.SignatureRequestModal.network')}
							</Text>
							<View row cross="center" main="space-between">
								<View mr="xxs">
									<Token token={network.nativeToken as MinkeToken} size={24} />
								</View>
								<View mr="xxs">
									<Text weight="semiBold" type="lMedium">
										{network.name}
									</Text>
								</View>
							</View>
						</View>
					</View>
					<View>
						<Text weight="semiBold" type="lMedium" color="text4" mb="xxs">
							{i18n.t('Components.SignatureRequestModal.message')}
						</Text>
						<TextArea disabled value={message} />
					</View>
					<View mt="l" row>
						<View flex1>
							<Button
								title={i18n.t('Components.SignatureRequestModal.cancel')}
								mode="outlined"
								onPress={onDismiss}
							/>
						</View>
						<View mr="s" />
						<View flex1>
							<Button title={i18n.t('Components.SignatureRequestModal.confirm')} onPress={onSign} />
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SignatureRequestModal;
