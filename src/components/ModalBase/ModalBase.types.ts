export interface ModalBaseProps {
	isVisible: boolean;
	onDismiss: () => void;
	children: React.ReactNode;
}
