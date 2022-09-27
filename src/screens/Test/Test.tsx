import React, { useState } from 'react';
import { Button, ModalBase, View } from '@components';
import WalletConnect from '@walletconnect/client';
import { BasicLayout } from '@layouts';
import ConnectionRequestModal from '@src/components/WalletConnect/ConnectionRequestModal';
import { useWalletConnectSessions } from '@hooks';
import { CallbackParams, HandleApprovalParams, Meta } from '@src/hooks/useWalletConnectSessions/types';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const [wc, setWc] = useState<WalletConnect>();
	const [meta, setMeta] = useState<Meta>();
	const [approvalHandler, setApprovalHandler] = useState<(params: CallbackParams) => void>();
	const uri =
		'wc:a9b78dae-fa1b-49ce-b037-c8d9094b512d@1?bridge=https%3A%2F%2F6.bridge.walletconnect.org&key=d77e513c32cbc569cdea46cc454baebf2c65166c8ac77c61c6265bd1dd9b2fcb';
	const { walletConnectOnSessionRequest } = useWalletConnectSessions();

	const showApprovalModal = ({ connector, m, handleApproval }: HandleApprovalParams) => {
		setWc(connector);
		setMeta(m);
		setApprovalHandler(handleApproval);
		setVisible(true);
	};

	walletConnectOnSessionRequest(uri, showApprovalModal);

	const connect = async (approved: boolean, address: string, chainId: number) => {
		if (meta && approvalHandler) {
			console.log('approvalHandler', approvalHandler);
			console.log('calling approval handler', {
				accountAddress: address,
				chainId,
				approved,
				dappName: meta.dappName,
				dappScheme: meta.dappScheme,
				dappUrl: meta.dappUrl,
				peerId: meta.peerId
			});
			const marcos = await approvalHandler({
				accountAddress: address,
				chainId,
				approved,
				dappName: meta.dappName,
				dappScheme: meta.dappScheme,
				dappUrl: meta.dappUrl,
				peerId: meta.peerId
			});
			setVisible(false);
		}
	};

	const dismiss = () => {
		wc?.rejectSession();
		setVisible(false);
	};

	return (
		<>
			<BasicLayout>
				<View flex1 mt="xxl">
					<Button title="Connect" onPress={() => setVisible(true)} />
				</View>
			</BasicLayout>
			<ModalBase isVisible={visible} onDismiss={dismiss}>
				<ConnectionRequestModal onDismiss={dismiss} handleApproval={connect} meta={meta} />
			</ModalBase>
		</>
	);
};

export default Test;
