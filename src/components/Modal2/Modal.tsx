import React, { useRef, useEffect } from 'react';
import ModalHeader from './ModalHeader';
import Bare, { ModalProps } from './Bare';

interface Props {
	isVisible: boolean;
	onDismiss: () => void;
	height: number;
}

const Teste: React.FC<Props> = ({ children, isVisible, onDismiss, height }) => {
	const ref = useRef<ModalProps>(null);
	const show = () => ref.current?.show();
	const dismiss = () => ref.current?.dismiss();

	useEffect(() => {
		if (isVisible) show();
		else dismiss();
	}, [isVisible]);

	return (
		<Bare height={height} ref={ref} onDismiss={onDismiss}>
			<ModalHeader onBackdropPress={onDismiss} />
			{children}
		</Bare>
	);
};

export default Teste;
