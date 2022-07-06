import { MinkeToken } from '@models/token';

export interface SearchTokensProps {
	visible: boolean;
	onDismiss: any;
	onTokenSelect: Function;
	showOnlyOwnedTokens: boolean;
	ownedTokens?: Array<MinkeToken>;
	selected?: Array<string | undefined>;
	withdraw?: boolean;
}
