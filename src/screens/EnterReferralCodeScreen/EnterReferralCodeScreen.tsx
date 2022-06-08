import React from 'react';
import { TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { BasicLayout } from '@layouts';
import { Button, Icon, Input, Modal, Text } from '@components';
import { useLanguage, useNavigation } from '@hooks';
import { whale5Img as whaleImage } from '@images';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from './EnterReferralCodeScreen.styles';
import useEnterReferralCodeScreen from './EnterReferralCodeScreen.hooks';
import EarnModal from '../ReferralScreen/EarnModal/EarnModal';
import useReferralScreen from '../ReferralScreen/ReferralScreen.hooks';

const EnterReferralCodeScreen = () => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const { code, setCode, invalidCode, onConfirm } = useEnterReferralCodeScreen();
	const { earnModalVisible, onEarnPress, onEarnDismiss } = useReferralScreen();

	return (
		<>
			<BasicLayout>
				<View style={[styles.row, styles.header]}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={styles.row}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
						<Text weight="extraBold" type="h3">
							{i18n.t('EnterReferralCodeScreen.enter_referral_code')}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('WalletScreen')}>
						<Icon name="closeStroke" color="text7" size={24} />
					</TouchableOpacity>
				</View>

				<ScrollView
					style={styles.padding}
					contentContainerStyle={{
						alignItems: 'center'
					}}
				>
					<Image source={whaleImage} style={styles.image} />
					<Text type="h2" weight="bold" style={styles.title} width={280} center marginBottom={24}>
						{i18n.t('EnterReferralCodeScreen.get_rewarded_for_saving_money')}
					</Text>
					<Input
						label={i18n.t('Components.Inputs.enter_code')}
						value={code}
						onChangeText={(t) => setCode(t)}
						autoCompleteType="off"
						error={code !== undefined && invalidCode}
						style={{ marginBottom: 32 }}
					/>
					<Button
						title={i18n.t('Components.Buttons.use_code')}
						disabled={invalidCode}
						onPress={onConfirm}
						marginBottom={8}
					/>
					<Text type="p2" color="text4" center marginBottom={8}>
						{i18n.t('EnterReferralCodeScreen.or')}
					</Text>
					<Button
						onPress={onEarnPress}
						title={i18n.t('EnterReferralCodeScreen.refer_a_friend')}
						mode="outlined"
						marginBottom={24}
					/>
					<Text type="a" color="text3" weight="semiBold" center marginBottom={8} width={293}>
						{i18n.t('EnterReferralCodeScreen.referral_note')}
					</Text>
				</ScrollView>
				<KeyboardSpacer />
			</BasicLayout>
			<Modal isVisible={earnModalVisible} onDismiss={onEarnDismiss}>
				<EarnModal onDismiss={onEarnDismiss} />
			</Modal>
		</>
	);
};

export default EnterReferralCodeScreen;
