import React, { useState } from 'react';
import { useLanguage } from '@hooks';
import { ResultProps } from '@src/screens/WalletScreen/WalletScreen.types';
import ModalReusables from '@src/components/ModalReusables';
import ModalBase from '@src/components/ModalBase/ModalBase';

interface SendModalComponentProps {
	sendModal: boolean;
	setSendModal: (val: boolean) => void;
}

const SendModalComponent: React.FC<SendModalComponentProps> = ({ sendModal, setSendModal }) => {
	const { i18n } = useLanguage();
	const [sendModalFinished, setSendModalFinished] = useState(false);
	const [sentTransaction, setSentTransaction] = useState<ResultProps>();
	const [error, setError] = useState(false);

	const onSendFinished = (obj: ResultProps) => {
		const { hash } = obj;
		setSendModalFinished(!hash);
		setSentTransaction(obj);
	};

	const onError = () => {
		setSendModalFinished(false);
		setError(true);
		setSendModal(true);
	};

	return (
		<>
			<ModalBase isVisible={sendModal} onDismiss={() => setSendModal(false)}>
				<ModalReusables.Send
					onDismiss={() => setSendModal(false)}
					sentSuccessfully={(obj: ResultProps) => onSendFinished(obj)}
					isVisible={sendModal}
					onError={onError}
				/>
			</ModalBase>
			<ModalBase isVisible={sendModalFinished} onDismiss={() => setSendModalFinished(false)}>
				{sentTransaction && (
					<ModalReusables.TransactionWait
						transactionHash={sentTransaction.hash}
						fromToken={sentTransaction.token}
						onDismiss={() => setSendModalFinished(false)}
						sent
					/>
				)}
			</ModalBase>
			<ModalBase isVisible={error} onDismiss={() => setError(false)}>
				{error && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setError(false)}
						showHeader
					/>
				)}
			</ModalBase>
		</>
	);
};

export default SendModalComponent;
