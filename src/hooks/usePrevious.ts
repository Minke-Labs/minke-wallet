import { useEffect, useRef } from 'react';

const usePrevious = (val: any): any => {
	const ref = useRef();
	useEffect(() => {
		ref.current = val;
	}, [val]);
	return ref.current;
};

export default usePrevious;
