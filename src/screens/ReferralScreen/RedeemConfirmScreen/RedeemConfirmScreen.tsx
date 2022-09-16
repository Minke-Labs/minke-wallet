import React from 'react';
import { View } from 'react-native';
import { Header, HapticButton, Paper, ModalBase, ModalReusables } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useNavigation, useTheme } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import DirectionButton from '@src/screens/ExchangeScreen/DirectionButton/DirectionButton';
import { TokenDetail } from '@src/screens/ExchangeResumeScreen/TokenDetail/TokenDetail';
import { makeStyles } from './RedeemConfirmScreen.styles';
import useRedeemConfirmScreenHooks from './RedeemConfirmScreen.hooks';

const RedeemConfirmScreen = () => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { fromToken, toToken, fromTokenAmount, toTokenAmount, usdAmount, loading, error, onSwapConfirm, setError } =
		useRedeemConfirmScreenHooks();
	RNUxcam.tagScreenName('RedeemConfirmScreen');

	return (
		<>
			<BasicLayout>
				<Header
					onPress={() => navigation.goBack()}
					title={i18n.t('RedeemConfirmScreen.confirmation')}
					mb="m"
				/>

				<Paper mb="s" m="xs">
					<View style={styles.container}>
						<View style={styles.containerLeft}>
							{!!fromToken && (
								<TokenDetail
									token={fromToken}
									amount={fromTokenAmount}
									usdAmount={usdAmount}
									loading={loading}
								/>
							)}
						</View>
						<View style={styles.containerRight}>
							{!!toToken && (
								<TokenDetail
									token={toToken}
									amount={toTokenAmount || '0'}
									usdAmount={usdAmount}
									loading={loading}
								/>
							)}
						</View>
						<DirectionButton disabled right />
					</View>
				</Paper>

				<View style={styles.haptic}>
					<HapticButton title={i18n.t('Components.Buttons.swap')} onPress={onSwapConfirm} />
				</View>
			</BasicLayout>

			<ModalBase isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</ModalBase>
		</>
	);
};

export default RedeemConfirmScreen;
