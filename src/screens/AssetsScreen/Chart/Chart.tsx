import React, { useState } from 'react';
import { View } from 'react-native';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import Main from './Main';
import Selection from './Selection';
import Header from './Header';
import { graphs } from './Graph.utils';

type GraphIndex = 0 | 1 | 2 | 3 | 4;

const Graph = () => {
	const [percChange, setPercChange] = useState(0);
	const translation = useVector();
	const transition = useSharedValue(0);
	const previous = useSharedValue<GraphIndex>(0);
	const current = useSharedValue<GraphIndex>(0);

	const setOnJSThread = (aqui: any) => {
		setPercChange(graphs[aqui].data.percentChange);
	};

	useDerivedValue(() => {
		runOnJS(setOnJSThread)(current.value);
	});

	return (
		<View style={{ flex: 1 }}>
			<Header index={current} {...{ percChange, translation }} />
			<Main {...{ previous, current, transition, translation, percChange }} />
			<Selection {...{ previous, current, transition }} />
		</View>
	);
};

export default Graph;
