import { ColorType } from '@styles';

export interface BasicLayoutProps {
	style?: any;
	center?: boolean;
	bgc?: keyof ColorType;
	hideSafeAreaView?: boolean;
}
