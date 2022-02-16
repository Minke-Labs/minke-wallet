import React, { createContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { colors, ColorType } from '@styles';

interface ThemeContextProps {
	colors: ColorType;
}

// Necessary because Typescript 🙄
const mock = {
	colors: colors.darkTheme
};

export const ThemeContext = createContext<ThemeContextProps>(mock);

const ThemeProvider: React.FC = ({ children }) => {
	const scheme = useColorScheme();

	const theme = useMemo(
		() => ({
			colors: scheme === 'dark' ? colors.darkTheme : colors.lightTheme
		}),
		[scheme]
	);

	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
