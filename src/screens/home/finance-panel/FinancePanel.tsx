import React, { useState } from 'react';
import TabSelector from './tab-selector/TabSelector';
import NetWorth from './net-worth/NetWorth';
import Transactions from './transactions/Transactions';

const FinancePanel = ({ loading }: { loading: boolean }) => {
	const [selectedTab, setSelectedTab] = useState('transactions');
	return (
		<>
			<TabSelector selectedTab={selectedTab} onTabSelect={setSelectedTab} />
			{selectedTab === 'net_worth' ? <NetWorth /> : <Transactions loading={loading} />}
		</>
	);
};

export default FinancePanel;
