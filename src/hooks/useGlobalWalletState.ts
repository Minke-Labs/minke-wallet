import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';

const useGlobalWalletState = () => useState(globalWalletState()).value;

export default useGlobalWalletState;
