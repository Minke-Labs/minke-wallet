import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenLoadingIndicator } from '@components';
import { BasicLayout } from '@layouts';
import { useTokens } from '@hooks';
import { sum } from 'lodash';
import EmptyState from './EmptyState/EmptyState';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';
import { Background } from './Background/Background';
import { useSaveScreen } from './SaveScreen.hooks';

const SaveScreen = () => {
	const { aaveMarket } = useSaveScreen();
	const { interestTokens } = useTokens();
	if (!interestTokens || !aaveMarket) return <ScreenLoadingIndicator />;
	if (interestTokens.length === 0) return <EmptyState />;
	const depositsBalance = sum(interestTokens.map((t) => t.balanceUSD));

	return (
		<BasicLayout hideSafeAreaView bg="detail4">
			<SafeAreaView>
				<Background>
					<Header />
					<CurrentValue depositsBalance={depositsBalance} aaveMarket={aaveMarket!} />
				</Background>
			</SafeAreaView>

			<Body {...{ interestTokens }} />
		</BasicLayout>
	);
};
export default SaveScreen;
