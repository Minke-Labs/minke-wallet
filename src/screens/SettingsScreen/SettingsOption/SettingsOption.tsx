import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from '@components';
import { useTheme } from '@hooks';
import { styles } from './SettingsOption.styles';
import { SettingsOptionProps } from './SettingsOption.types';

const SettingsOption: React.FC<SettingsOptionProps> = ({ label, onPress, icon, newTab, alert }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onPress}>
			<View style={styles.leftContainer}>
				<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
					<Icon name={icon} size={24} color={alert ? 'alert1' : 'text7'} />
				</View>
				<Text
					color={alert ? 'alert1' : 'text7'}
					weight="bold"
					style={{ fontSize: 16, marginLeft: 16 }}
				>
					{label}
				</Text>
			</View>

			{
				!alert && (
					<Icon
						name={newTab ? 'openInNew' : 'arrowForwardStroke'}
						size={24}
						color="text7"
					/>
				)
			}
		</TouchableOpacity>
	);
};

export default SettingsOption;
