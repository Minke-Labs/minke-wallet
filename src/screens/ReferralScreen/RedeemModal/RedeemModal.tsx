/* eslint-disable no-nested-ternary */
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ModalHeader, ModalReusables } from '@components';
import { useTheme, useWalletState } from '@hooks';
import { networks } from '@models/network';
import { makeStyles } from './RedeemModal.styles';
import NotEnoughPoints from './NotEnoughPoints/NotEnoughPoints';
import SelectAmount from './SelectAmount/SelectAmount';

const RedeemModal = ({ onDismiss, code }: { onDismiss: () => void; code: string | undefined }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { state } = useWalletState();
	const {
		network: { chainId }
	} = state.value;
	const points = 1000;
	const enoughPoints = points > 0;
	const rightNetwork = chainId === networks.matic.chainId;

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				{enoughPoints ? (
					rightNetwork ? (
						<SelectAmount points={points} />
					) : (
						<ModalReusables.WrongNetwork />
					)
				) : (
					<NotEnoughPoints code={code} />
				)}
			</View>
		</SafeAreaView>
	);
};

export default RedeemModal;
