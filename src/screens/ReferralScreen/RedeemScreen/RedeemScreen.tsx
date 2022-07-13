import React from 'react';
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';
import { ActivityIndicator, Button, Header, Modal, ModalReusables, TokenCard } from '@components';
import { useLanguage, useMinkeRewards, useNavigation, useTheme, useWalletState } from '@hooks';
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
	const { state } = useWalletState();
	const {
		network: { chainId }
	} = state.value;
	const { points, loading: loadingPoints } = useMinkeRewards();
	const notEnoughPoints = !loadingPoints && points <= 0;
	const wrongNetwork = chainId !== networks.matic.chainId;
	const navigation = useNavigation();
	const dismissModal = () => navigation.navigate('ReferralScreen');
	const { i18n } = useLanguage();
	const { fromToken, toToken, loading, fromConversionAmount, conversionAmount, canSwap, onSwap, updateFromQuotes } =
		useRedeemScreenHooks(points);

	return (
		<>
			<BasicLayout>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<>
						<Header title={i18n.t('ReferralScreen.RedeemScreen.redeem_minke_points')} marginBottom={36} />
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

							<DirectionButton loading={loading} disabled />
						</View>
						<View style={styles.buttonBox}>
							{loading ? (
								<ActivityIndicator />
							) : (
								<Button
									title={i18n.t('ReferralScreen.RedeemScreen.swap')}
									onPress={onSwap}
									disabled={!canSwap}
								/>
							)}
						</View>
						<KeyboardSpacer />
					</>
				</TouchableWithoutFeedback>
			</BasicLayout>
			<Modal isVisible={wrongNetwork} onDismiss={dismissModal}>
				{wrongNetwork && (
					<ModalReusables.WrongNetwork
						network={networks.matic}
						onDismiss={dismissModal}
						description={i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.please_change_network', {
							network: networks.matic.name
						})}
					/>
				)}
			</Modal>
			<Modal isVisible={notEnoughPoints} onDismiss={dismissModal}>
				{notEnoughPoints && <NotEnoughPointsModal code={code} onDismiss={dismissModal} />}
			</Modal>
		</>
	);
};

export default RedeemScreen;
