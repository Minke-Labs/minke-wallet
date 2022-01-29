import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type WeightType = keyof typeof weight;
const weight = {
	regular: 'Inter_400Regular',
	medium: 'Inter_500Medium',
	bold: 'Inter_700Bold',
	extraBold: 'Inter_800ExtraBold'
};

type FontType = keyof typeof type;
const type = {
	h1: {
		fontSize: 36,
		lineHeight: 44
	},
	h2: {
		fontSize: 30,
		lineHeight: 36
	},
	h3: {
		fontSize: 24,
		lineHeight: 29
	},
	p: {
		fontSize: 18,
		lineHeight: 22
	}
};

interface TextComponentProps {
	fontWeight: WeightType;
	fontType: FontType;
	fontColor: keyof ReactNativePaper.ThemeColors;
	marginBottom: number;
	width: number;
}

interface MakeStylesProps {
	fontWeight: WeightType;
	fontType: FontType;
	color: string;
	marginBottom: number;
	width: number;
}

const makeStyles = ({ fontWeight, fontType, color, marginBottom, width }: MakeStylesProps) =>
	StyleSheet.create({
		text: {
			fontFamily: weight[fontWeight],
			textAlign: 'center',
			marginBottom,
			color,
			...(width > 0 ? { width } : {}),
			...type[fontType]
			// borderWidth: 1,
			// borderColor: 'red'
		}
	});

const TextComponent: React.FC<Partial<TextComponentProps>> = ({
	children,
	fontWeight = 'regular',
	fontType = 'p',
	fontColor = 'text',
	marginBottom = 0,
	width = 0
}) => {
	const { colors } = useTheme();
	const color = colors[fontColor];
	const styles = makeStyles({ fontWeight, fontType, color, marginBottom, width });
	return <Text style={styles.text}>{children}</Text>;
};

export default TextComponent;
