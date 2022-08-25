import React from 'react';
import { ScrollView } from 'react-native';
import { ViewType } from '@styles';

interface ScrollProps extends ViewType {
	hideScroll: boolean;
	horizontal?: boolean;
}

const Scroll: React.FC<Partial<ScrollProps>> = ({
	children,
	hideScroll = false,
	horizontal = false,
	...rest
}) => (
	<ScrollView
		horizontal={horizontal}
		showsHorizontalScrollIndicator={!hideScroll}
		showsVerticalScrollIndicator={!hideScroll}
		{...{ ...rest }}
	>
		{children}
	</ScrollView>
);

export default Scroll;
