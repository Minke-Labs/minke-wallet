import { PayId, Interac, FasterPayments, Sepa } from './images';

export const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'australia':
			return {
				backgroundColor: '#FFFFFF',
				fontColor: '#0A2138',
				image: PayId
			};
		case 'unitedKingdom':
			return {
				backgroundColor: '#FFFFFF',
				fontColor: '#0A2138',
				image: FasterPayments
			};
		case 'canada':
			return {
				backgroundColor: '#FFB92A',
				fontColor: '#0A2138',
				image: Interac
			};
		case 'europeanUnion':
			return {
				backgroundColor: '#004899',
				fontColor: '#FFFFFF',
				image: Sepa
			};
		default:
			return null;
	}
};
