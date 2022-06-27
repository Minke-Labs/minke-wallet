import React, { useEffect, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { AppTourStepType } from './AppTour.types';
import { Boxes } from './Boxes/Boxes';
import Overlay from './Overlay/Overlay';

const usePrevious = (value: any): any => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
};

const AppTour: React.FC = ({ children }) => {
	const shuffleBack = useSharedValue(false);
	const [type, setType] = useState<AppTourStepType>(0);
	const bool = true;

	if (bool) {
		return (
			<>
				<Overlay type={type}>
					{children}
				</Overlay>
				{[0, 1, 2, 3, 4, 5].map((curr: number) => (curr === type ? (
					<Boxes
						shuffleBack={shuffleBack}
						type={curr as AppTourStepType}
						key={curr}
						setType={(val: AppTourStepType) => setType(val)}
						previous={usePrevious(curr)}
					/>
				) : null))}
			</>
		);
	}

	return <>{children}</>;
};

export default AppTour;
