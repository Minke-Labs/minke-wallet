import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
