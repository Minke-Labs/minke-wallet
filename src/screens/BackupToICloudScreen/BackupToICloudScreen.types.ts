export interface BackupToICloud {
	walletId: string;
	onError: (message: string) => void;
	restoreBackups?: boolean;
}
