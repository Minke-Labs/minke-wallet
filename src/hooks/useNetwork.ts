import { useContext } from 'react';
import { NetworkContext } from '../contexts/NetworkContext/NetworkContext';

const useNetwork = () => useContext(NetworkContext);

export default useNetwork;
