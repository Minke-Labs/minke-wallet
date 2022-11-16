import { MinkeToken } from '@models/types/token.types';

export interface SearchTokensProps {
	visible: boolean;
	onDismiss: any;
	onTokenSelect: Function;
	showOnlyOwnedTokens: boolean;
	ownedTokens?: Array<MinkeToken>;
	selected?: Array<string | undefined>;
	withdraw?: boolean;
	enableSections?: boolean;
}
