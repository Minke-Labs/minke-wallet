import React, { useEffect, useRef, useState, createContext, useMemo } from 'react';
import { AppTourStepType } from './AppTour.types';
import { Boxes } from './Boxes/Boxes';
import Overlay from './Overlay/Overlay';

const usePrevious = (val: any): any => {
	const ref = useRef();
	useEffect(() => {
		ref.current = val;
	}, [val]);
	return ref.current;
};

export const AppTourContext = createContext<any>(null);

const AppTour: React.FC = ({ children }) => {
	const [active, setActive] = useState(true);
	const [type, setType] = useState<AppTourStepType>(0);
	const prevType = usePrevious(type);

	const dismiss = () => setActive(false);

	const obj = useMemo(
		() => ({ dismiss }),
		[type]
	);

	if (!active) {
		return (
			<>
				{children}
			</>
		);
	}

	return (
		<AppTourContext.Provider value={obj}>
			<Overlay type={type}>
				{children}
			</Overlay>
			{[0, 1, 2, 3, 4, 5].map((curr: number) => (curr === type ? (
				<Boxes
					type={curr as AppTourStepType}
					key={curr}
					setType={(val: AppTourStepType) => setType(val)}
					previous={prevType}
				/>
			) : null))}
		</AppTourContext.Provider>
	);
};

export default AppTour;
