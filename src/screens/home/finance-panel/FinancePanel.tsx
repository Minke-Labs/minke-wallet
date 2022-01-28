import React, { useState } from 'react';
import TabSelector from './tab-selector/TabSelector';
import NetWorth from './net-worth/NetWorth';
import Transactions from './transactions/Transactions';

const FinancePanel = ({ loading, onSeeAllTransactions }: { loading: boolean; onSeeAllTransactions: () => void }) => {
	const [selectedTab, setSelectedTab] = useState('transactions');
	return (
		<>
			<TabSelector selectedTab={selectedTab} onTabSelect={setSelectedTab} />
			{selectedTab === 'net_worth' ? (
				<NetWorth />
			) : (
				<Transactions loading={loading} onSeeAllTransactions={onSeeAllTransactions} />
			)}
		</>
	);
};

export default FinancePanel;
