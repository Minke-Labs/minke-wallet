import React, { createContext, useMemo, useState } from 'react';

export const ErrorContext = createContext<any>(null);

const ThemeProvider: React.FC = ({ children }) => {
	const [onBlockchainError, setBlockchainError] = useState(false);

	const theme = useMemo(
		() => ({
			something: 'Some testing color.',
			onBlockchainError,
			setBlockchainError
		}),
		[]
	);

	return <ErrorContext.Provider value={theme}>{children}</ErrorContext.Provider>;
};

export default ThemeProvider;
