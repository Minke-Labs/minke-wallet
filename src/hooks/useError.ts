import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext/ErrorContext';

const useError = () => useContext(ErrorContext);

export default useError;
