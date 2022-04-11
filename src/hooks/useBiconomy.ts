import { useContext } from 'react';
import { BiconomyContext } from '../contexts/BiconomyContext/BiconomyContext';

const useBiconomy = () => useContext(BiconomyContext);

export default useBiconomy;
