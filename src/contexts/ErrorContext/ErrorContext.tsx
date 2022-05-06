import React, { createContext, useMemo, useState, useEffect } from 'react';

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

	useEffect(() => {
		console.log('ErrorContext:', onBlockchainError);
	}, [onBlockchainError]);

	return <ErrorContext.Provider value={theme}>{children}</ErrorContext.Provider>;
};

export default ThemeProvider;
