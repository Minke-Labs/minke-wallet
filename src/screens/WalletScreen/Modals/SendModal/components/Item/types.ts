import { ImageSourcePropType } from 'react-native';

interface ItemProps {
	firstLine: string;
	secondLine: string | JSX.Element;
	imageSource?: ImageSourcePropType;
	onSelected: () => void;
}

export type { ItemProps };
