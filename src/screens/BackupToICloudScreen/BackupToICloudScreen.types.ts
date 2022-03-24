export interface BackupToICloudProps {
	walletId?: string;
	onError: (message: string) => void;
	restoreBackups?: boolean;
}
