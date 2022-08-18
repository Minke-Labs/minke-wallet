import React from 'react';
import { View, Image } from 'react-native';
import { Text, Flag } from '@components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Item.styles';

interface ItemProps {
	avatar: any;
	onPress: () => void;
}

export const Item: React.FC<ItemProps> = ({ avatar, onPress }) => (
	<TouchableOpacity style={styles.container} onPress={onPress}>
		<Image
			source={avatar.image}
			style={styles.image}
		/>
		<View style={{ flex: 1 }}>
			<View style={styles.titleContainer}>
				<Text
					type="lLarge"
					weight="semiBold"
					style={{ marginRight: 8 }}
				>
					{avatar.name}
				</Text>
				<Flag name={avatar.flag} size={16} />
			</View>
			<View>
				<Text type="bSmall">{avatar.desc}</Text>
			</View>
		</View>
	</TouchableOpacity>
);
