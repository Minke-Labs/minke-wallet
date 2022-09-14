/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Animated from 'react-native-reanimated';
import { ViewType } from '@styles';
import View from '../View/View';

class AnimatedView extends React.Component<Partial<ViewType>> {
	render() {
		const { children } = this.props;
		return (
			<View {...this.props}>
				{children}
			</View>
		);
	}
}

export default Animated.createAnimatedComponent(AnimatedView);
