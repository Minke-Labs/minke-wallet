import React, { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { AppTourStepType } from './AppTour.types';
import { Boxes } from './Boxes/Boxes';
import Overlay from './Overlay/Overlay';

const AppTour: React.FC = ({ children }) => {
	const shuffleBack = useSharedValue(false);
	const [type] = useState<AppTourStepType>(0);
	const bool = true;

	if (bool) {
		return (
			<>
				<Overlay type={type}>
					{children}
				</Overlay>
				{[0, 1, 2, 3, 4, 5].map((box: number) => (
					<Boxes
						shuffleBack={shuffleBack}
						type={box as AppTourStepType}
						key={box}
						index={box}
					/>
				))}
			</>
		);
	}

	return <>{children}</>;
};

export default AppTour;
