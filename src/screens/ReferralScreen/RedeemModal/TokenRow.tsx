import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Token } from '@components';
import { TokenType } from '@styles';
import { useTheme } from '@hooks';
import { makeStyles } from './RedeemModal.styles';

const TokenRow = ({ tokenName, usdPrice }: { tokenName: string; usdPrice: number }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<TouchableOpacity style={[styles.row, styles.tokenRow]}>
			<View style={styles.row}>
				<Token name={tokenName.toLowerCase() as TokenType} size={32} />
				<Text type="p" weight="bold" color="text2" style={styles.tokenName}>
					{tokenName}:
				</Text>
			</View>
			<Text type="p2" weight="semiBold" color="text2">
				${usdPrice}
			</Text>
		</TouchableOpacity>
	);
};

export default TokenRow;
