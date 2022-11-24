import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import { screenWidth, SpacingType } from '@styles';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@hooks';
import View from '@src/components/View/View';
import AnimatedView from '@src/components/AnimatedView/AnimatedView';
import BasicLayout from '@src/layouts/BasicLayout/BasicLayout';
import Header from '@src/components/Header/Header';
import Icon from '@src/components/Icon/Icon';
import { Gradient } from './Gradient';

const timing = { duration: 1200 };

interface BlankLayoutProps {
	title?: string;
	br?: SpacingType;
	invert?: boolean;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children, title, br, invert }) => {
	const navigation = useNavigation();
	const posX = useSharedValue(-screenWidth);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: posX.value }]
	}));

	useEffect(() => {
		posX.value = withRepeat(withTiming(screenWidth, timing), -1);
	}, []);

	return (
		<View bgc={invert ? 'background7' : 'background1'} flex1 br={br}>
			<SafeAreaView />
			{!!title && (
				<Header
					title={title}
					onRightActionClick={() => navigation.goBack()}
					rightAction={<Icon name="close" size={24} color="text7" />}
				/>
			)}
			<MaskedView
				androidRenderingMode="software"
				style={{ flex: 1 }}
				maskElement={
					<View flex1 cross="center">
						{children}
					</View>
				}
			>
				<BasicLayout hideSafeAreaView center hidePadding>
					{children}
					<AnimatedView h="100%" style={[{ position: 'absolute', left: 0 }, animatedStyle]}>
						<Gradient />
					</AnimatedView>
				</BasicLayout>
			</MaskedView>
		</View>
	);
};

export default BlankLayout;
