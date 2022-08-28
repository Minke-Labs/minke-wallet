import { useState, useEffect } from 'react';
import { useAmplitude, useFormProgress } from '@hooks';
import { MinkeToken } from '@models/types/token.types';
import { UserProps } from './Send.types';

export const useSendModal = ({ isVisible, onDismiss }: { isVisible: boolean; onDismiss: () => void }) => {
	const { track } = useAmplitude();
	const { currentStep, reset, goForward, goBack } = useFormProgress();
	const [user, setUser] = useState<UserProps>(null!);
	const [token, setToken] = useState<MinkeToken>();
	const [addContactVisible, setAddContactVisible] = useState(false);

	useEffect(() => {
		if (!isVisible) {
			reset();
			setAddContactVisible(false);
		} else {
			track('Send Modal Opened');
		}
	}, [isVisible]);

	const onUserSelected = (item: UserProps) => {
		goForward();
		setUser(item);
		setAddContactVisible(true);
	};

	const onTokenSelected = (coin: MinkeToken) => {
		goForward();
		setToken(coin);
	};

	const onBack = () => (currentStep > 0 ? goBack() : onDismiss());
	const onContactsBack = () => (addContactVisible ? setAddContactVisible(false) : onBack());

	return {
		currentStep,
		user,
		token,
		addContactVisible,
		setAddContactVisible,
		onUserSelected,
		onTokenSelected,
		onContactsBack
	};
};
