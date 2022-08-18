import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Paper2, View, Icon, Modal } from '@components';
import { useNavigation } from '@hooks';
import { spacing } from '@styles';
import Actions from './Actions/Actions';

export const Selector: React.FC = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();
	const { name: routeName } = useRoute();
	return (
		<>
			<View
				cross="center"
				s={1}
				style={{
					position: 'absolute',
					width: '100%',
					bottom: spacing[6]
				}}
			>
				<Paper2
					w={196}
					h={52}
					br={6}
					row
					main="space-between"
					cross="center"
					ph={4}
				>
					<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
						<Icon
							name="home"
							size={28}
							color={routeName === 'HomeScreen' ? 'cta1' : 'cta2'}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setModalVisible(true)}>
						<Icon
							name="exchange"
							size={28}
							color="cta2"
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('MinkeHubScreen')}>
						<Icon
							name="hub"
							size={28}
							color={routeName === 'MinkeHubScreen' ? 'cta1' : 'cta2'}
						/>
					</TouchableOpacity>
				</Paper2>
			</View>
			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<Actions />
			</Modal>
		</>
	);
};
