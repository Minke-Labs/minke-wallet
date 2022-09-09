import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat
} from 'react-native-reanimated';
import { screenWidth, SpacingType } from '@styles';
import MaskedView from '@react-native-masked-view/masked-view';
import { useNavigation } from '@hooks';
import View from '@src/components/View/View';
import AnimatedView from '@src/components/AnimatedView/AnimatedView';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import BasicLayout from '@src/layouts/BasicLayout/BasicLayout';
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
		<View bgc={invert ? 'background2' : 'background1'} flex1 br={br}>
			<SafeAreaView />
			{!!title && (
				<ModalHeader
					onDismiss={() => navigation.goBack()}
					onBack={() => navigation.goBack()}
					title={title}
				/>
			)}
			<MaskedView
				androidRenderingMode="software"
				style={{ flex: 1 }}
				maskElement={(
					<View flex1 cross="center">
						{children}
					</View>
				)}
			>
				<BasicLayout hideSafeAreaView center bgc={invert ? 'background1' : 'background2'}>
					{children}
					<AnimatedView
						h="100%"
						style={[{ position: 'absolute', left: 0 }, animatedStyle]}
					>
						<Gradient />
					</AnimatedView>
				</BasicLayout>
			</MaskedView>
		</View>
	);
};

export default BlankLayout;
