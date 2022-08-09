import { useContext } from 'react';
import { NFTContext } from '../contexts/NFTContext/NFTContext';

const useNFT = () => useContext(NFTContext);

export default useNFT;
