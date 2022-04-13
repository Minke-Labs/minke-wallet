import { PayId, Interac, Ideal, FasterPayments, Sepa } from './images';

export const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'Australia':
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
		case 'Canada':
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
		case 'Unknown':
			return {
				backgroundColor: '#CC0066',
				fontColor: '#FFFFFF',
				image: Ideal
			};
		default:
			return {};
	}
};
