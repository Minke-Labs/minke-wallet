import React from 'react';
import { ScrollView } from 'react-native';
import { ViewType } from '@styles';

interface ScrollProps extends ViewType {
	hideIndicator: boolean;
	horizontal?: boolean;
}

const Scroll: React.FC<Partial<ScrollProps>> = ({
	children,
	hideIndicator = false,
	horizontal = false,
	...rest
}) => (
	<ScrollView
		horizontal={horizontal}
		showsHorizontalScrollIndicator={!hideIndicator}
		showsVerticalScrollIndicator={!hideIndicator}
		{...{ ...rest }}
	>
		{children}
	</ScrollView>
);

export default Scroll;
