/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTheme } from '@hooks';
import { Icon, Text, Token } from '@components';
import { TokenType } from '@styles';

const styles = StyleSheet.create({
	container: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderStyle: 'solid'
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '50%'
	},
	tag: {
		paddingHorizontal: 8,
		borderRadius: 14
	}
});

interface ListItemProps {
	onPress: (event: GestureResponderEvent) => void;
	label: string;
	selected: boolean;
	token: string;
	testnet: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ label, selected, onPress, token, testnet }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, { borderBottomColor: colors.background2 }]}
			disabled={selected}
		>
			<View style={styles.leftContainer}>
				<Token outline={selected} name={token?.toLowerCase() as TokenType} size={32} />
				<Text style={{ marginLeft: 8 }} weight={selected ? 'bold' : 'medium'}>
					{label}
				</Text>
			</View>

			{testnet && (
				<View style={[styles.tag, { backgroundColor: colors.background2 }]}>
					<Text color="text2" style={{ fontSize: 12 }}>
						test network
					</Text>
				</View>
			)}

			<View style={{ width: 24 }}>{selected && <Icon name="checkColor" size={24} />}</View>
		</TouchableOpacity>
	);
};

export default ListItem;
