import React from 'react';
import { View } from 'react-native';
import { Text, Header, HapticButton, Paper, ModalBase, ModalReusables } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useTheme } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import DirectionButton from '@src/screens/ExchangeScreen/DirectionButton/DirectionButton';
import { TokenDetail } from '@src/screens/ExchangeResumeScreen/TokenDetail/TokenDetail';
import { Rate } from '@src/screens/ExchangeResumeScreen/Rate/Rate';
import { makeStyles } from './RedeemConfirmScreen.styles';
import useRedeemConfirmScreenHooks from './RedeemConfirmScreen.hooks';

const RedeemConfirmScreen = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const {
		fromToken,
		toToken,
		fromTokenAmount,
		toTokenAmount,
		usdAmount,
		loading,
		error,
		count,
		onSwapConfirm,
		setError
	} = useRedeemConfirmScreenHooks();
	RNUxcam.tagScreenName('RedeemConfirmScreen');

	return (
		<>
			<BasicLayout>
				<Header title={i18n.t('RedeemConfirmScreen.confirmation')} marginBottom={36} />

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
					<View style={styles.containerBottom}>
						<Text type="lSmall" weight="semiBold" style={{ marginRight: 8 }}>
							{i18n.t('RedeemConfirmScreen.rate_fixed_for')}
						</Text>
						{!loading && <Rate count={count} />}
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
