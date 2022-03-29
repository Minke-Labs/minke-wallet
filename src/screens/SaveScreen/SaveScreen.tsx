import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenLoadingIndicator } from '@components';
import { BasicLayout } from '@layouts';
import EmptyState from './EmptyState/EmptyState';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';
import { Background } from './Background/Background';
import { useSaveScreen } from './SaveScreen.hooks';

const SaveScreen = () => {
	const { address, aaveBalances, aaveMarket, onWithdraw } = useSaveScreen();
	if (!aaveBalances) return <ScreenLoadingIndicator />;
	const { products = [], meta } = aaveBalances[address.toLowerCase()];
	const lending = products.find((p) => p.label === 'Lending');
	if (!lending) return <EmptyState />;
	const { value: depositsBalance = 0 } = meta.find((m) => m.label === 'Assets') || {};

	return (
		<BasicLayout hideSafeAreaView bg="detail4">
			<SafeAreaView>
				<Background>
					<Header />
					<CurrentValue depositsBalance={depositsBalance} aaveMarket={aaveMarket!} />
				</Background>
			</SafeAreaView>

			<Body {...{ lending, onWithdraw }} />
		</BasicLayout>
	);
};
export default SaveScreen;
