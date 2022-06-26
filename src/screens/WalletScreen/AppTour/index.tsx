/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import Overlay from './Overlay/Overlay';

const AppTour: React.FC = ({ children }) => {
	const bool = true;

	if (bool) {
		return (
			<Overlay type={1}>
				{children}
			</Overlay>
		);
	}

	return <>{children}</>;
};

export default AppTour;
