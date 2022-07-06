import React, { useState, useMemo } from 'react';
import { useFirstTime, usePrevious } from '@hooks';
import { AppTourContext } from './Context/AppTourContext';
import { AppTourStepType } from './AppTour.types';
import { Boxes } from './Boxes/Boxes';
import Overlay from './Overlay/Overlay';

const AppTour: React.FC = ({ children }) => {
	const { loading, isFirstTimeLoad } = useFirstTime();
	const [active, setActive] = useState(true);
	const [type, setType] = useState<AppTourStepType>(0);
	const prevType = usePrevious(type);

	const dismiss = () => setActive(false);

	const obj = useMemo(
		() => ({
			dismiss,
			type,
			setType
		}),
		[type]
	);

	if (!active || loading || !isFirstTimeLoad) return <>{children}</>;

	return (
		<AppTourContext.Provider value={obj}>
			<Overlay type={type}>
				{children}
			</Overlay>
			{[0, 1, 2, 3, 4, 5].map((curr: number) => (curr === type && (
				<Boxes
					type={curr as AppTourStepType}
					key={curr.toString()}
					setType={(val: AppTourStepType) => setType(val)}
					previous={prevType}
				/>
			)))}
		</AppTourContext.Provider>
	);
};

export default AppTour;
