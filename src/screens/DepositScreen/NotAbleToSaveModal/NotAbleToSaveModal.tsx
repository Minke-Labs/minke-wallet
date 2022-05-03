import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, ModalHeader, PaperTouchable, Icon } from '@components';
import { useLanguage } from '@hooks';
import { NotAbleToSaveModalProps } from './NotAbleToSaveModal.types';
import { useNotAbleToSaveModal } from './NotAbleToSaveModal.hooks';

const NotAbleToSaveModal: React.FC<NotAbleToSaveModalProps> = ({ onDismiss, onAddFunds, visible }) => {
	const { i18n } = useLanguage();
	const { defaultUSDCoin, goToExchange, onAddFundsPressed } = useNotAbleToSaveModal({
		onDismiss,
		onAddFunds,
		visible
	});

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={{ paddingHorizontal: 24 }}>
				<Text type="h3" weight="extraBold" marginBottom={8}>
					{i18n.t('DepositScreen.NotAbleToSaveModal.not_able')}
				</Text>
				<Text type="p" marginBottom={40}>
					{i18n.t('DepositScreen.NotAbleToSaveModal.need_funds_in')}
					<Text weight="bold">{defaultUSDCoin}</Text>.
				</Text>
				<View style={{ marginBottom: 16 }}>
					<PaperTouchable onPress={onAddFundsPressed}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name="copyStroke" style={{ marginRight: 8 }} size={16} />
							<Text type="a" weight="medium">
								{i18n.t('DepositScreen.NotAbleToSaveModal.add_funds')}
							</Text>
						</View>
					</PaperTouchable>
				</View>
				<View style={{ marginBottom: 16 }}>
					<PaperTouchable onPress={goToExchange}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name="shareStroke" style={{ marginRight: 8 }} size={16} />
							<Text type="a" weight="medium">
								{i18n.t('DepositScreen.NotAbleToSaveModal.exchange')}
							</Text>
						</View>
					</PaperTouchable>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default NotAbleToSaveModal;
