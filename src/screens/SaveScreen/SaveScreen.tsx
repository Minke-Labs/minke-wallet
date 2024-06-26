import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { ModalBase, BlankStates } from '@components';
import { BasicLayout } from '@layouts';
import { useBalances, useDepositProtocols, useLanguage } from '@hooks';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';
import { Background } from './Background/Background';
import InfoModal from './InfoModal';

const SaveScreen = () => {
	RNUxcam.tagScreenName('SaveScreen');
	const { i18n } = useLanguage();
	const [isModalVisible, setModalVisible] = useState(false);
	const { apy, protocol } = useDepositProtocols();
	const { interestTokens, depositedBalance } = useBalances();

	if (!interestTokens) return <BlankStates.Type2 title={i18n.t('Components.BlankStates.Save')} />;

	return (
		<>
			<BasicLayout hideSafeAreaView bgc="detail4">
				<SafeAreaView>
					<Background>
						<Header onInfo={() => setModalVisible(true)} />
						<CurrentValue depositsBalance={depositedBalance} apy={apy} protocol={protocol} />
					</Background>
				</SafeAreaView>
				<Body {...{ interestTokens }} />
			</BasicLayout>

			<ModalBase isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				{protocol?.id === 'aave' ? (
					<InfoModal.Aave onDismiss={() => setModalVisible(false)} />
				) : (
					<InfoModal.MStable onDismiss={() => setModalVisible(false)} />
				)}
			</ModalBase>
		</>
	);
};

export default SaveScreen;
