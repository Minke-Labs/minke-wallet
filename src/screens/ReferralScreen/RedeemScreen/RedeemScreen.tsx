import React from 'react';
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Header, ModalBase, ModalReusables, TokenCard } from '@components';
import { useGlobalWalletState, useLanguage, useMinkeRewards, useNavigation, useTheme } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { networks } from '@models/network';
import { debounce } from 'lodash';
import { BasicLayout } from '@layouts';
import DirectionButton from '@src/screens/ExchangeScreen/DirectionButton/DirectionButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { makeStyles } from './RedeemScreen.styles';
import NotEnoughPointsModal from './NotEnoughPointsModal/NotEnoughPointsModal';
import useRedeemScreenHooks from './RedeemScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemScreen'>;
const RedeemScreen = ({ route }: Props) => {
	const { code } = route.params;
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const {
		network: { chainId }
	} = useGlobalWalletState();
	const { points, loading: loadingPoints } = useMinkeRewards();
	const notEnoughPoints = !loadingPoints && points <= 0;
	const wrongNetwork = chainId !== networks.matic.chainId;
	const navigation = useNavigation();
	const dismissModal = () => navigation.navigate('ReferralScreen');
	const { i18n } = useLanguage();
	const { fromToken, toToken, fromConversionAmount, conversionAmount, canSwap, onSwap, updateFromQuotes } =
		useRedeemScreenHooks(points);

	return (
		<>
			<BasicLayout>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<>
						<Header title={i18n.t('ReferralScreen.RedeemScreen.redeem_minke_points')} marginBottom="m" />
						<View style={styles.container}>
							<View style={styles.top}>
								<TokenCard
									token={fromToken}
									conversionAmount={fromConversionAmount}
									updateQuotes={debounce(updateFromQuotes, 500)}
									exchange
									disableInput
									notTouchable
									disableMax
								/>
							</View>
							<View style={styles.bottom}>
								<TokenCard
									token={toToken}
									conversionAmount={conversionAmount}
									disableAmountValidation
									disableMax
									exchange
									disableInput
									notTouchable
								/>
							</View>

							<DirectionButton loading={false} disabled />
						</View>
						<View style={styles.buttonBox}>
							<Button
								title={i18n.t('ReferralScreen.RedeemScreen.swap')}
								onPress={onSwap}
								disabled={!canSwap}
							/>
						</View>
						<KeyboardSpacer />
					</>
				</TouchableWithoutFeedback>
			</BasicLayout>
			<ModalBase isVisible={wrongNetwork} onDismiss={dismissModal}>
				{wrongNetwork && (
					<ModalReusables.WrongNetwork
						network={networks.matic}
						onDismiss={dismissModal}
						description={i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.please_change_network', {
							network: networks.matic.name
						})}
					/>
				)}
			</ModalBase>
			<ModalBase isVisible={notEnoughPoints} onDismiss={dismissModal}>
				{notEnoughPoints && <NotEnoughPointsModal code={code} onDismiss={dismissModal} />}
			</ModalBase>
		</>
	);
};

export default RedeemScreen;
