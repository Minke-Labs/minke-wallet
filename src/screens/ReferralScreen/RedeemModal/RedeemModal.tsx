import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Icon, ModalHeader, Text } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { makeStyles } from './RedeemModal.styles';
import TokenRow from './TokenRow';
import useRedeemModalHooks from './RedeemModal.hooks';

const RedeemModal = ({ onDismiss }: { onDismiss: () => void }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { i18n } = useLanguage();
	const { tokens } = useRedeemModalHooks();

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				<Text type="h3" weight="bold" style={{ width: '100%' }} marginBottom={8}>
					{i18n.t('ReferralScreen.Modals.RedeemModal.redeem_your_points')}
				</Text>
				<Text type="p2" color="text2" style={{ width: '100%' }} marginBottom={24}>
					{i18n.t('ReferralScreen.Modals.RedeemModal.select_the_token_you_want')}
				</Text>
				<TouchableOpacity style={styles.random}>
					<View style={styles.row}>
						<View style={styles.questionMark}>
							<Icon name="questionMark" color="cta1" />
						</View>

						<Text weight="bold" type="p" color="text2">
							{i18n.t('ReferralScreen.Modals.RedeemModal.surprise')}
						</Text>
					</View>
					<View>
						<Text type="p2" color="text3">
							{i18n.t('ReferralScreen.Modals.RedeemModal.randomly_selected')}
						</Text>
					</View>
				</TouchableOpacity>

				{tokens.map(({ id, name, usdPrice }) => (
					<TokenRow tokenName={name} usdPrice={usdPrice} key={id} />
				))}

				<TouchableOpacity>
					<Text type="p2" weight="semiBold" color="text4" marginBottom={32}>
						{i18n.t('ReferralScreen.Modals.RedeemModal.i_have_a_referral_code')}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RedeemModal;
