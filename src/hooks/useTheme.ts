import { useContext } from 'react';
import { ThemeContext } from '@contexts';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
