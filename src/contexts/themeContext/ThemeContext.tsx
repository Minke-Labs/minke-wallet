import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-native-paper';
import { darkTheme, lightTheme } from '@styles';

const ThemeContext: React.FC = ({ children }) => {
	const scheme = useColorScheme();

	return <Provider theme={scheme === 'dark' ? darkTheme : lightTheme}>{children}</Provider>;
};

export default ThemeContext;
