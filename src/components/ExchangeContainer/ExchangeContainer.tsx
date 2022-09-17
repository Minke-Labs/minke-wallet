import React from 'react';
import { useTheme } from '@hooks';
import View from '@src/components/View/View';
import DirectionButton from './DirectionButton/DirectionButton';

interface ExchangeContainerProps {
	upperComponent: JSX.Element;
	lowerComponent: JSX.Element;
	onPress?: () => void;
	loading?: boolean;
	disabled?: boolean;
}

const ExchangeContainer: React.FC<ExchangeContainerProps> = ({
	upperComponent, lowerComponent, onPress, loading, disabled
}) => {
	const { colors } = useTheme();
	return (
		<View
			bgc="background5"
			br="xs"
			mh="xs"
			mb="s"
			main="center"
			cross="center"
		>
			<View
				ph="xs"
				pt="xs"
				pb="s"
				w="100%"
				style={{
					borderBottomWidth: 1,
					borderBottomColor: colors.background1
				}}
			>
				{upperComponent}
			</View>
			<View ph="xs" pb="xs" pt="s" w="100%">
				{lowerComponent}
			</View>
			<DirectionButton
				onPress={onPress}
				loading={loading}
				disabled={disabled}
			/>
		</View>
	);
};

export default ExchangeContainer;
