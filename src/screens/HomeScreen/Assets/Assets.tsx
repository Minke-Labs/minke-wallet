import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Paper2, Text, View, Button2, Modal } from '@components';
import { useAvatar, useFormProgress, useTheme, useWalletState } from '@hooks';
import AvatarModal from './AvatarModal/AvatarModal';

export const Assets: React.FC = () => {
	const { currentStep, goBack, goForward } = useFormProgress();
	const [visible, setVisible] = useState(false);
	const { colors } = useTheme();
	const { state } = useWalletState();
	const { address } = state.value;
	const { currentAvatar } = useAvatar();
	return (
		<>
			<Paper2 br={3} p={3} mb={3}>
				<View row main="space-between" cross="center" mb={4}>
					<View>
						<Text type="lMedium" weight="semiBold" color="text3">
							Your total assets
						</Text>
						<Text type="dMedium">
							$200.00
						</Text>
					</View>
					<TouchableOpacity onPress={() => setVisible(true)}>
						{!!address && (
							<Image
								source={currentAvatar.image}
								style={{
									width: 56,
									height: 56,
									borderRadius: 28,
									borderWidth: 3,
									borderColor: colors.background1
								}}
							/>
						)}
					</TouchableOpacity>
				</View>
				<View row bw={2}>
					<Button2
						iconLeft="add"
						title="Add funds"
						onPress={() => null}
					/>
					<View mr={2} />
					<Button2
						iconLeft="add"
						title="Add funds"
						onPress={() => null}
					/>
				</View>
			</Paper2>
			<Modal
				isVisible={visible}
				onDismiss={() => setVisible(false)}
				{...(currentStep !== 0 && { onBack: goBack })}
			>
				<AvatarModal
					currentStep={currentStep}
					onBack={goBack}
					onSelectAvatar={goForward}
				/>
			</Modal>
		</>
	);
};
