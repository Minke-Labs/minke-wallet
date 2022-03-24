import { useContext } from 'react';
import { AmplitudeContext } from '../contexts/AmplitudeContext/AmplitudeContext';

const useAmplitude = () => useContext(AmplitudeContext);

export default useAmplitude;
