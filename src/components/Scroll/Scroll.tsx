import React from 'react';
import { ScrollView } from 'react-native';
import { ViewType } from '@styles';

interface ScrollProps extends ViewType {
	hideScroll: boolean;
}

const Scroll: React.FC<Partial<ScrollProps>> = ({ children, hideScroll = false, ...rest }) => (
	<ScrollView
		showsHorizontalScrollIndicator={!hideScroll}
		showsVerticalScrollIndicator={!hideScroll}
		{...{ ...rest }}
	>
		{children}
	</ScrollView>
);

export default Scroll;
