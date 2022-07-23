import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat
} from 'react-native-reanimated';
import { screenWidth } from '@styles';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTheme } from '@hooks';
import BasicLayout from '../../../layouts/BasicLayout/BasicLayout';
import { Gradient } from './Gradient';
import styles from './BlankLayout.styles';

const timing = { duration: 1200 };

const BlankLayout: React.FC = ({ children }) => {
	const { colors } = useTheme();
	const posX = useSharedValue(-screenWidth);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: posX.value }]
	}));

	useEffect(() => {
		posX.value = withRepeat(withTiming(screenWidth, timing), -1);
	}, []);

	return (
		<View style={{
			backgroundColor: colors.background5,
			flex: 1
		}}
		>
			<MaskedView
				androidRenderingMode="software"
				style={{ flex: 1 }}
				maskElement={
					<View style={{ alignItems: 'center', flex: 1 }}>
						{children}
					</View>
				}
			>
				<BasicLayout hideSafeAreaView center bg="background5">
					{children}
					<Animated.View style={[styles.container, animatedStyle]}>
						<Gradient />
					</Animated.View>
				</BasicLayout>
			</MaskedView>
		</View>
	);
};

export default BlankLayout;
