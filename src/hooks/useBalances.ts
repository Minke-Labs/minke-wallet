import { useContext } from 'react';
import { BalanceContext } from '../contexts/BalanceContext/BalanceContext';

const useBalances = () => useContext(BalanceContext);

export default useBalances;
