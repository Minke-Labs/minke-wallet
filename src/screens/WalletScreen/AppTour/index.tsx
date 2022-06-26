import React, { useState } from 'react';
import { AppTourStepType } from './AppTour.types';
import { Boxes } from './Boxes/Boxes';
import Overlay from './Overlay/Overlay';

const AppTour: React.FC = ({ children }) => {
	const [type] = useState<AppTourStepType>(0);
	const bool = true;

	if (bool) {
		return (
			<>
				<Overlay type={type}>
					{children}
				</Overlay>
				<Boxes type={type} />
			</>
		);
	}

	return <>{children}</>;
};

export default AppTour;
