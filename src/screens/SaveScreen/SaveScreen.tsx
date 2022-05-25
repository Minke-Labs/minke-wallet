import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenLoadingIndicator, Modal, AaveReusables } from '@components';
import { BasicLayout } from '@layouts';
import { useDepositProtocols, useTokens } from '@hooks';
import EmptyState from './EmptyState/EmptyState';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';
import { Background } from './Background/Background';
import InfoModal from './InfoModal';

const SaveScreen = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const { apy } = useDepositProtocols();
	const { interestTokens, depositedBalance } = useTokens();
	if (!interestTokens || !apy) return <ScreenLoadingIndicator />;
	if (interestTokens.length === 0) return <EmptyState />;

	return (
		<>
			<BasicLayout hideSafeAreaView bg="detail4">
				<SafeAreaView>
					<Background>
						<Header onInfo={() => setModalVisible(true)} />
						<CurrentValue depositsBalance={depositedBalance} apy={apy!} />
					</Background>
				</SafeAreaView>
				<Body {...{ interestTokens }} />
			</BasicLayout>

			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<AaveReusables.Background ghostTop={220}>
					<InfoModal.Aave onDismiss={() => setModalVisible(false)} />
				</AaveReusables.Background>
			</Modal>
		</>
	);
};
export default SaveScreen;
