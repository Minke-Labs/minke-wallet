import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

const useglobalWalletState = () => useState(globalWalletState()).value;

export default useglobalWalletState;
