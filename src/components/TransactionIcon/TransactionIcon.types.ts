interface TransactionIconProps {
	received: boolean;
	pending?: boolean;
	failed?: boolean;
	topUp?: boolean;
	exchange?: boolean;
	deposit?: boolean;
	withdraw?: boolean;
	size?: number;
	arrowSize?: number;
}

export type { TransactionIconProps };
