import React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import Main from './Main';
import Selection from './Selection';
import Header from './Header';

type GraphIndex = 0 | 1 | 2 | 3 | 4;

const Graph = () => {
	const translation = useVector();
	const transition = useSharedValue(0);
	const previous = useSharedValue<GraphIndex>(0);
	const current = useSharedValue<GraphIndex>(0);

	return (
		<View style={{ flex: 1 }}>
			<Header translation={translation} index={current} />
			<Main {...{ previous, current, transition, translation }} />
			<Selection {...{ previous, current, transition }} />
		</View>
	);
};

export default Graph;