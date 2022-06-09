import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { EmptyStates } from '@components';
import { makeStyles } from './Body.styles';

export const Body = ({ onEarnPress }: { onEarnPress: () => void }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.depositCardContainer}>
			<View style={styles.actionDepositCard}>
				<EmptyStates.NoReferralPoints onEarnPress={onEarnPress} />
			</View>
		</View>
	);
};
