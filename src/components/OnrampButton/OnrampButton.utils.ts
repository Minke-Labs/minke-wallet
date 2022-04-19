import { PayId, Interac, FasterPayments, Sepa } from './images';

export const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'AU':
			return {
				backgroundColor: '#FFFFFF',
				fontColor: '#0A2138',
				image: PayId
			};
		case 'UK':
			return {
				backgroundColor: '#FFFFFF',
				fontColor: '#0A2138',
				image: FasterPayments
			};
		case 'CA':
			return {
				backgroundColor: '#FFB92A',
				fontColor: '#0A2138',
				image: Interac
			};
		case 'EU':
			return {
				backgroundColor: '#004899',
				fontColor: '#FFFFFF',
				image: Sepa
			};
		default:
			return null;
	}
};
