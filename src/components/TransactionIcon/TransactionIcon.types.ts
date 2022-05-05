interface TransactionIconProps {
	received: boolean;
	pending?: boolean;
	failed?: boolean;
	topUp?: boolean;
	exchange?: boolean;
	deposit?: boolean;
	withdraw?: boolean;
}

export type { TransactionIconProps };
