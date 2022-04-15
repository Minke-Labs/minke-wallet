import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext/LocationContext';

const useLocation = () => useContext(LocationContext);

export default useLocation;
