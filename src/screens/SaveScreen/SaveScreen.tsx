import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ModalBase, BlankStates } from '@components';
import { BasicLayout } from '@layouts';
import { useDepositProtocols, useBalances, useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import EmptyState from './EmptyState/EmptyState';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';
import { Background } from './Background/Background';
import InfoModal from './InfoModal';

const SaveScreen = () => {
	const { i18n } = useLanguage();
	const [isModalVisible, setModalVisible] = useState(false);
	const { apy, selectedProtocol } = useDepositProtocols();
	const { interestTokens, depositedBalance } = useBalances();
	RNUxcam.tagScreenName('SaveScreen');

	if (!interestTokens) return <BlankStates.Type2 title={i18n.t('Components.BlankStates.Save')} />;
	if (interestTokens.length === 0) return <EmptyState />;

	return (
		<>
			<BasicLayout hideSafeAreaView bgc="detail4">
				<SafeAreaView>
					<Background>
						<Header onInfo={() => setModalVisible(true)} />
						<CurrentValue depositsBalance={depositedBalance} apy={apy} />
					</Background>
				</SafeAreaView>
				<Body {...{ interestTokens }} />
			</BasicLayout>

			<ModalBase isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				{selectedProtocol?.id === 'aave' ? (
					<InfoModal.Aave onDismiss={() => setModalVisible(false)} />
				) : (
					<InfoModal.MStable onDismiss={() => setModalVisible(false)} />
				)}
			</ModalBase>
		</>
	);
};
export default SaveScreen;
