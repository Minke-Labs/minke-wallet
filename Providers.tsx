/* eslint-disable react/jsx-no-useless-fragment */
import React, { ComponentProps, FC } from 'react';
import { providers } from '@contexts';

export const combineComponents = (...components: FC[]): FC => components.reduce(
	(AccumulatedComponents, CurrentComponent) => ({ children }: ComponentProps<FC>): JSX.Element => (
		<AccumulatedComponents>
			<CurrentComponent>{children}</CurrentComponent>
		</AccumulatedComponents>
	),
	({ children }) => <>{children}</>
);

export const AppContextProvider = combineComponents(...providers);

export const Providers: FC = ({ children }) => (
	<AppContextProvider>
		{children}
	</AppContextProvider>
);
