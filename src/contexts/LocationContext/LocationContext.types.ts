export interface LocationContextProps {
	countryCode: string | null;
	errorMsg: string | undefined;
	setCountryCode: (val: string) => any;
}
