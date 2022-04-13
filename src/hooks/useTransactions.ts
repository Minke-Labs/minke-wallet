import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext/TransactionsContext';

const useTransactions = () => useContext(TransactionsContext);

export default useTransactions;
