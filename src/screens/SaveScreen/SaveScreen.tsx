import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenLoadingIndicator } from '@components';
import { BasicLayout } from '@layouts';
import { useDepositProtocols, useTokens } from '@hooks';
import EmptyState from './EmptyState/EmptyState';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';
import { Background } from './Background/Background';

const SaveScreen = () => {
	const { apy } = useDepositProtocols();
	const { interestTokens, depositedBalance } = useTokens();
	if (!interestTokens || !apy) return <ScreenLoadingIndicator />;
	if (interestTokens.length === 0) return <EmptyState />;

	return (
		<BasicLayout hideSafeAreaView bg="detail4">
			<SafeAreaView>
				<Background>
					<Header />
					<CurrentValue depositsBalance={depositedBalance} apy={apy!} />
				</Background>
			</SafeAreaView>

			<Body {...{ interestTokens }} />
		</BasicLayout>
	);
};
export default SaveScreen;
