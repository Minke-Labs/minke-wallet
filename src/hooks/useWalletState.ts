import { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext/WalletContext';

const useWalletState = () => useContext(WalletContext);

export default useWalletState;
