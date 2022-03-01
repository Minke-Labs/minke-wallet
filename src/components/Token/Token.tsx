import React from 'react';
import { View, Image } from 'react-native';
import { token } from '@styles';
import { whale3Img } from '@images';
import { Svg, Path } from 'react-native-svg';
import { addColorOpacity } from '@helpers/utilities';
import { TokenProps, ContentProps } from './Token.types';

const Content: React.FC<ContentProps> = ({ name, size, tokenColor }) => {
	const dArr = token[name].slice(1);
	return (
		<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
			{dArr.map((d, idx) => (
				<Path key={d} d={d} fill={idx === 0 ? tokenColor : 'white'} />
			))}
		</Svg>
	);
};

const Token: React.FC<Partial<TokenProps>> = ({ name, size = 96, outline, glow }) => {
	if (!token[name!]) {
		return (
			<Image
				source={whale3Img}
				style={{
					width: size,
					height: size,
					borderRadius: size / 2
				}}
			/>
		);
	}

	const tokenColor = token[name!][0];

	if (outline && !glow) {
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: size + 6,
					height: size + 6,
					borderRadius: (size + 6) / 2,
					borderWidth: 1,
					borderColor: tokenColor
				}}
			>
				<Content {...{ size, tokenColor }} name={name!} />
			</View>
		);
	}

	if (glow && !outline) {
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: size + 6,
					height: size + 6,
					borderRadius: (size + 6) / 2,
					backgroundColor: addColorOpacity(tokenColor, 0.25)
				}}
			>
				<Content {...{ size, tokenColor }} name={name!} />
			</View>
		);
	}

	return <Content {...{ size, tokenColor }} name={name!} />;
};

export default Token;
