import { useContext } from 'react';
import { CountryContext } from '../contexts/CountryContext/CountryContext';

const useCountry = () => useContext(CountryContext);

export default useCountry;
