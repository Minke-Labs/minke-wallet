import { Currency } from '@models/types/currency.types';
import { countries, flag } from '@styles';
import useLanguage from './useLanguage';

const useCurrencies = () => {
	const { i18n } = useLanguage();
	const enabled = [
		'AU',
		'AR',
		'BR',
		'CA',
		'EU',
		'GB',
		'LK',
		'NG',
		'PK',
		'TR',
		'US',
		'BG',
		'CH',
		'CO',
		'CZ',
		'DK',
		'DO',
		'EG',
		'HK',
		'HR',
		'ID',
		'JP',
		'JO',
		'KE',
		'KR',
		'KW',
		'MA',
		'MX',
		'MY',
		'NO',
		'NZ',
		'OM',
		'PE',
		'PL',
		'RO',
		'SG',
		'SE',
		'TH',
		'TW',
		'VN',
		'ZA',
		'IL',
		'CN'
	].sort();
	const currencies: Currency[] = enabled.map((country) => ({
		country: countries[country],
		flag: flag[country],
		name: i18n.t(`LocationContext.${country}.currencyName`)
	}));

	return {
		currencies
	};
};

export default useCurrencies;
