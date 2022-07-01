import React, { createContext, useMemo } from 'react';

export const AvatarContext = createContext<any>(null);

const AvatarProvider: React.FC = ({ children }) => {
	const obj = useMemo(
		() => ({
			value: 'value value'
		}),
		[]
	);

	return <AvatarContext.Provider value={obj}>{children}</AvatarContext.Provider>;
};

export default AvatarProvider;
