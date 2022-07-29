import React from 'react';
import { DepositableToken } from '@models/types/depositTokens.types';
import { DepositProtocol } from '@models/deposit';
import { MinkeToken } from '@models/token';

export interface DepositProps {
	apy: string;
	depositableToken: DepositableToken | undefined;
	selectedProtocol: DepositProtocol | undefined;
	setSelectedUSDCoin: React.Dispatch<React.SetStateAction<string>>;
	token: MinkeToken | undefined;
	setToken: React.Dispatch<React.SetStateAction<MinkeToken | undefined>>;
	depositableTokens: MinkeToken[];
}
